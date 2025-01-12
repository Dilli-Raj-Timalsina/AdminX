"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IEntity, IEntityField } from "@/types/entity";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FormBuilderProps {
  entity: IEntity;
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

export function FormBuilder({
  entity,
  initialData,
  onSubmit,
}: FormBuilderProps) {
  const [loading, setLoading] = useState(false);

  // Generate Zod schema from entity definition
  const generateZodSchema = (fields: IEntity["fields"]) => {
    const schema: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.inputOptions.hidden || field.inputOptions.readOnly) return;

      let fieldSchema: any = z.any();

      switch (field.dbConfig.type) {
        case "boolean":
          fieldSchema = z.boolean();
          break;
        case "integer":
        case "smallint":
        case "float":
          fieldSchema = z.number();
          break;
        default:
          fieldSchema = z.string();
      }

      if (field.inputOptions.required) {
        fieldSchema = fieldSchema.min(1, "This field is required");
      } else {
        fieldSchema = fieldSchema.optional();
      }

      if (field.saveOptions?.validate) {
        fieldSchema = fieldSchema.refine(
          (value: any) => !field.saveOptions?.validate?.(value)?.error,
          (value: any) => ({
            message:
              field.saveOptions?.validate?.(value)?.error || "Invalid value",
          })
        );
      }

      schema[field.key] = fieldSchema;
    });

    return z.object(schema);
  };

  const form = useForm({
    resolver: zodResolver(generateZodSchema(entity.fields)),
    defaultValues: initialData || {},
  });

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      setLoading(true);
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  const renderTextField = (field: IEntity["fields"][0]) => (
    <FormField
      key={field.key}
      control={form.control}
      name={field.key}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.inputOptions.label}</FormLabel>
          <FormControl>
            <Input
              {...formField}
              placeholder={field.inputOptions.placeholder}
              disabled={loading}
            />
          </FormControl>
          {field.inputOptions.helpText && (
            <FormDescription>{field.inputOptions.helpText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderTextareaField = (field: IEntity["fields"][0]) => (
    <FormField
      key={field.key}
      control={form.control}
      name={field.key}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.inputOptions.label}</FormLabel>
          <FormControl>
            <Textarea
              {...formField}
              placeholder={field.inputOptions.placeholder}
              disabled={loading}
            />
          </FormControl>
          {field.inputOptions.helpText && (
            <FormDescription>{field.inputOptions.helpText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderCheckboxField = (field: IEntity["fields"][0]) => (
    <FormField
      key={field.key}
      control={form.control}
      name={field.key}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.inputOptions.label}</FormLabel>
          <FormControl>
            <Checkbox
              checked={formField.value}
              onCheckedChange={formField.onChange}
              disabled={loading}
            />
          </FormControl>
          {field.inputOptions.helpText && (
            <FormDescription>{field.inputOptions.helpText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderSelectField = (field: IEntity["fields"][0]) => (
    <FormField
      key={field.key}
      control={form.control}
      name={field.key}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field.inputOptions.label}</FormLabel>
          <FormControl>
            <Select
              value={formField.value}
              onValueChange={formField.onChange}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder={field.inputOptions.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.inputOptions.selectOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {field.inputOptions.helpText && (
            <FormDescription>{field.inputOptions.helpText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderField = (field: IEntity["fields"][0]) => {
    if (field.inputOptions.hidden || field.inputOptions.readOnly) return null;

    switch (field.inputOptions.type) {
      case "text":
        return renderTextField(field);
      case "textarea":
        return renderTextareaField(field);
      case "checkbox":
        return renderCheckboxField(field);
      case "select":
        return renderSelectField(field);
      default:
        return null;
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {entity.fields.map(renderField)}
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

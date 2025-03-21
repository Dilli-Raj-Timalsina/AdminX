"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IEntity } from "@/types/entity";
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

type FormBuilderProps = {
  entity: IEntity;
  initialData?: Record<string, any>;
  handleSubmit: (data: Record<string, any>) => Promise<void>;
};

export function FormBuilder({
  entity,
  initialData,
  handleSubmit,
}: FormBuilderProps) {
  const [loading, setLoading] = useState(false);

  // Generate Zod schema from entity definition
  const generateZodSchema = (fields: IEntity["fields"]) => {
    const schema: Record<string, any> = {};

    fields.forEach((field) => {
      if (field.inputOptions.hidden || field.inputOptions.readOnly) return;

      let fieldSchema: any = z.any();

      switch (field.inputOptions.type) {
        case "checkbox":
          fieldSchema = z.boolean();
          break;
        case "text":
          fieldSchema = z.string();
          break;
        case "textarea":
          fieldSchema = z.string();
          break;
        case "select":
          fieldSchema = z.string();
          break;
        case "multi-select":
          fieldSchema = z.array(z.string());
          break;
        case "json":
          fieldSchema = z.object({});
          break;
        case "number":
          fieldSchema = z.number();
          break;
        case "date":
          fieldSchema = z.date();
          break;
        case "uuid":
          fieldSchema = z.string();
          break;
        default:
          fieldSchema = z.string();
      }

      if (field.inputOptions.required) {
        fieldSchema = fieldSchema.min(
          1,
          `${field.inputOptions.label} is required`
        );
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

      schema[field.dbConfig.columnName] = fieldSchema;
    });

    return z.object(schema);
  };

  const form = useForm({
    resolver: zodResolver(generateZodSchema(entity.fields)),
    defaultValues: initialData || {},
  });

  const renderTextField = (entityField: IEntity["fields"][0]) => (
    <FormField
      key={entityField.key}
      control={form.control}
      name={entityField.dbConfig.columnName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{entityField.inputOptions.label}</FormLabel>
          <FormControl>
            <Input
              key={entityField.key}
              {...field}
              placeholder={entityField.inputOptions.placeholder}
              disabled={loading}
              value={field.value || ""}
            />
          </FormControl>
          {entityField.inputOptions.helpText && (
            <FormDescription>
              {entityField.inputOptions.helpText}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderTextareaField = (entityField: IEntity["fields"][0]) => (
    <FormField
      key={entityField.key}
      control={form.control}
      name={entityField.dbConfig.columnName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{entityField.inputOptions.label}</FormLabel>
          <FormControl>
            <Textarea
              key={entityField.key}
              {...field}
              placeholder={entityField.inputOptions.placeholder}
              disabled={loading}
              value={field.value || ""}
            />
          </FormControl>
          {entityField.inputOptions.helpText && (
            <FormDescription>
              {entityField.inputOptions.helpText}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderCheckboxField = (entityField: IEntity["fields"][0]) => (
    <FormField
      key={entityField.key}
      control={form.control}
      name={entityField.dbConfig.columnName}
      render={({ field }) => (
        <FormItem className="">
          <div className="flex items-center justify-start gap-2">
            <FormLabel>{entityField.inputOptions.label}</FormLabel>
            <FormControl>
              <Checkbox
                key={entityField.key}
                {...field}
                checked={field.value || false}
                onCheckedChange={(checked) => {
                  field.onChange(checked === true);
                }}
                disabled={loading}
              />
            </FormControl>
          </div>
          {entityField.inputOptions.helpText && (
            <FormDescription>
              {entityField.inputOptions.helpText}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderSelectField = (entityField: IEntity["fields"][0]) => (
    <FormField
      key={entityField.key}
      control={form.control}
      name={entityField.dbConfig.columnName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{entityField.inputOptions.label}</FormLabel>
          <FormControl>
            <Select
              key={entityField.key}
              value={field.value || ""}
              onValueChange={field.onChange}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={entityField.inputOptions.placeholder}
                />
              </SelectTrigger>
              <SelectContent>
                {entityField.inputOptions.selectOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {entityField.inputOptions.helpText && (
            <FormDescription>
              {entityField.inputOptions.helpText}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderField = (entityField: IEntity["fields"][0]) => {
    if (entityField.inputOptions.hidden || entityField.inputOptions.readOnly)
      return null;
    switch (entityField.inputOptions.type) {
      case "text":
        return renderTextField(entityField);
      case "textarea":
        return renderTextareaField(entityField);
      case "checkbox":
        return renderCheckboxField(entityField);
      case "select":
        return renderSelectField(entityField);

      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 ">
          {entity.fields.map(renderField)}
          <Button type="submit" isLoading={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

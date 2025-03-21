"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IDbColumnType,
  IEntity,
  IEntityField,
  IEntityRelation,
  IEntityRelationType,
} from "@/@types/entity";
import { Plus, Trash2, Code } from "lucide-react";
import { toast } from "sonner";

export default function EntityGeneratorForm() {
  const [entity, setEntity] = useState<Partial<IEntity>>({
    key: "",
    dbConfig: {
      tableName: "",
      indexes: [],
    },
    display: {
      singularName: "",
      pluralName: "",
      description: "",
    },
    fields: [],
    relations: [],
  });

  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRequiredFields = () => {
    const newErrors: Record<string, string> = {};

    // Validate main entity required fields
    if (!entity.key) newErrors["key"] = "Entity key is required";
    if (!entity.dbConfig?.tableName)
      newErrors["tableName"] = "Table name is required";
    if (!entity.display?.singularName)
      newErrors["singularName"] = "Singular name is required";
    if (!entity.display?.pluralName)
      newErrors["pluralName"] = "Plural name is required";

    // Validate each field's required properties
    entity.fields?.forEach((field, index) => {
      if (!field.key) newErrors[`field-${index}-key`] = "Field key is required";
      if (!field.dbConfig.columnName)
        newErrors[`field-${index}-columnName`] = "Column name is required";
      if (!field.inputOptions.label)
        newErrors[`field-${index}-label`] = "Label is required";

      // If field is select type, validate selectOptions
      if (
        (field.inputOptions.type === "select" ||
          field.inputOptions.type === "multi-select") &&
        (!field.inputOptions.selectOptions ||
          field.inputOptions.selectOptions.length === 0)
      ) {
        newErrors[`field-${index}-selectOptions`] =
          "Select options are required for select fields";
      }
    });

    // Validate each relation's required properties
    entity.relations?.forEach((relation, index) => {
      if (!relation.key)
        newErrors[`relation-${index}-key`] = "Relation key is required";
      if (!relation.targetEntityKey)
        newErrors[`relation-${index}-targetEntityKey`] =
          "Target entity is required";
      if (!relation.targetFieldKey)
        newErrors[`relation-${index}-targetFieldKey`] =
          "Target field is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addField = () => {
    const newField: IEntityField<IDbColumnType> = {
      key: "",
      dbConfig: {
        columnName: "",
        type: "varchar",
      },
      inputOptions: {
        type: "text",
        label: "",
      },
    };

    setEntity({
      ...entity,
      fields: [...(entity.fields || []), newField],
    });
  };

  const updateField = (index: number, field: IEntityField<IDbColumnType>) => {
    const fields = [...(entity.fields || [])];
    fields[index] = field;
    setEntity({
      ...entity,
      fields,
    });
  };

  const removeField = (index: number) => {
    const fields = [...(entity.fields || [])];
    fields.splice(index, 1);
    setEntity({
      ...entity,
      fields,
    });
  };

  const addRelation = () => {
    const newRelation: IEntityRelation = {
      key: "",
      type: "many-to-one",
      targetEntityKey: "",
      targetFieldKey: "",
    };

    setEntity({
      ...entity,
      relations: [...(entity.relations || []), newRelation],
    });
  };

  const updateRelation = (index: number, relation: IEntityRelation) => {
    const relations = [...(entity.relations || [])];
    relations[index] = relation;
    setEntity({
      ...entity,
      relations,
    });
  };

  const removeRelation = (index: number) => {
    const relations = [...(entity.relations || [])];
    relations.splice(index, 1);
    setEntity({
      ...entity,
      relations,
    });
  };

  const generateEntityCode = (): string => {
    return `import { IEntity } from "@/types/entity";

export const ${
      entity.display?.singularName || ""
    }Entity: IEntity = ${JSON.stringify(entity, null, 2)};
`;
  };

  const handleCopyCode = () => {
    if (!validateRequiredFields()) {
      toast.error("Please fill in all required fields", {
        position: "bottom-right",
        duration: 5000,
        className: "text-red-500",
      });
      return;
    }

    const code = generateEntityCode();
    navigator.clipboard.writeText(code);
    toast.success("Entity code copied to clipboard!", {
      position: "bottom-right",
      duration: 5000,
      className: "text-blue-500",
    });
  };

  const handleAddSelectOption = (fieldIndex: number) => {
    const field = entity.fields?.[fieldIndex];
    if (!field) return;

    const updatedField = {
      ...field,
      inputOptions: {
        ...field.inputOptions,
        selectOptions: [
          ...(field.inputOptions.selectOptions || []),
          { label: "", value: "" },
        ],
      },
    };

    updateField(fieldIndex, updatedField as IEntityField<IDbColumnType>);
  };

  const handleUpdateSelectOption = (
    fieldIndex: number,
    optionIndex: number,
    key: "label" | "value",
    value: string
  ) => {
    const field = entity.fields?.[fieldIndex];
    if (!field || !field.inputOptions.selectOptions) return;

    const updatedOptions = [...field.inputOptions.selectOptions];
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      [key]: value,
    };

    const updatedField = {
      ...field,
      inputOptions: {
        ...field.inputOptions,
        selectOptions: updatedOptions,
      },
    };

    updateField(fieldIndex, updatedField as IEntityField<IDbColumnType>);
  };

  const handleRemoveSelectOption = (
    fieldIndex: number,
    optionIndex: number
  ) => {
    const field = entity.fields?.[fieldIndex];
    if (!field || !field.inputOptions.selectOptions) return;

    const updatedOptions = [...field.inputOptions.selectOptions];
    updatedOptions.splice(optionIndex, 1);

    const updatedField = {
      ...field,
      inputOptions: {
        ...field.inputOptions,
        selectOptions: updatedOptions,
      },
    };

    updateField(fieldIndex, updatedField as IEntityField<IDbColumnType>);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Entity Definition Generator</CardTitle>
        <CardDescription>
          Create a new entity definition with fields and relations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="fields">Fields</TabsTrigger>
            <TabsTrigger value="relations">Relations</TabsTrigger>
            {showPreview && <TabsTrigger value="preview">Preview</TabsTrigger>}
          </TabsList>

          <TabsContent value="basic">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="key" className="text-right">
                  Entity Key <span className="text-red-500">*</span>
                </Label>
                <div className="col-span-3">
                  <Input
                    id="key"
                    value={entity.key}
                    onChange={(e) =>
                      setEntity({ ...entity, key: e.target.value })
                    }
                    className={errors.key ? "border-red-500" : ""}
                    placeholder="users"
                  />
                  {errors.key && (
                    <p className="text-red-500 text-sm mt-1">{errors.key}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tableName" className="text-right">
                  Table Name <span className="text-red-500">*</span>
                </Label>
                <div className="col-span-3">
                  <Input
                    id="tableName"
                    value={entity.dbConfig?.tableName}
                    onChange={(e) =>
                      setEntity({
                        ...entity,
                        dbConfig: {
                          ...entity.dbConfig,
                          tableName: e.target.value,
                        },
                      })
                    }
                    className={errors.tableName ? "border-red-500" : ""}
                    placeholder="users"
                  />
                  {errors.tableName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.tableName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="singularName" className="text-right">
                  Singular Name <span className="text-red-500">*</span>
                </Label>
                <div className="col-span-3">
                  <Input
                    id="singularName"
                    value={entity.display?.singularName}
                    onChange={(e) =>
                      setEntity({
                        ...entity,
                        display: {
                          ...entity.display,
                          singularName: e.target.value,
                          pluralName: entity.display?.pluralName || "",
                          description: entity.display?.description || "",
                        },
                      })
                    }
                    className={errors.singularName ? "border-red-500" : ""}
                    placeholder="User"
                  />
                  {errors.singularName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.singularName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pluralName" className="text-right">
                  Plural Name <span className="text-red-500">*</span>
                </Label>
                <div className="col-span-3">
                  <Input
                    id="pluralName"
                    value={entity.display?.pluralName}
                    onChange={(e) =>
                      setEntity({
                        ...entity,
                        display: {
                          ...entity.display,
                          pluralName: e.target.value,
                          singularName: entity.display?.singularName || "",
                          description: entity.display?.description || "",
                        },
                      })
                    }
                    className={errors.pluralName ? "border-red-500" : ""}
                    placeholder="Users"
                  />
                  {errors.pluralName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.pluralName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={entity.display?.description || ""}
                  onChange={(e) =>
                    setEntity({
                      ...entity,
                      display: {
                        ...entity.display,
                        description: e.target.value,
                        singularName: entity.display?.singularName || "",
                        pluralName: entity.display?.pluralName || "",
                      },
                    })
                  }
                  className="col-span-3"
                  placeholder="System users"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fields">
            <div className="space-y-6">
              {entity.fields?.map((field, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Field #{index + 1}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeField(index)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`field-${index}-key`}
                        className="text-right"
                      >
                        Field Key <span className="text-red-500">*</span>
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id={`field-${index}-key`}
                          value={field.key}
                          onChange={(e) => {
                            const updatedField = {
                              ...field,
                              key: e.target.value,
                            };
                            updateField(index, updatedField);
                          }}
                          className={
                            errors[`field-${index}-key`] ? "border-red-500" : ""
                          }
                          placeholder="name"
                        />
                        {errors[`field-${index}-key`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`field-${index}-key`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`field-${index}-columnName`}
                        className="text-right"
                      >
                        Column Name <span className="text-red-500">*</span>
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id={`field-${index}-columnName`}
                          value={field.dbConfig.columnName}
                          onChange={(e) => {
                            const updatedField = {
                              ...field,
                              dbConfig: {
                                ...field.dbConfig,
                                columnName: e.target.value,
                              },
                            };
                            updateField(index, updatedField);
                          }}
                          className={
                            errors[`field-${index}-columnName`]
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="name"
                        />
                        {errors[`field-${index}-columnName`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`field-${index}-columnName`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`field-${index}-type`}
                        className="text-right"
                      >
                        DB Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={field.dbConfig.type}
                        onValueChange={(value) => {
                          const updatedField = {
                            ...field,
                            dbConfig: {
                              ...field.dbConfig,
                              type: value as IDbColumnType,
                            },
                          };
                          updateField(index, updatedField);
                        }}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select DB Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="boolean">Boolean</SelectItem>
                          <SelectItem value="varchar">Varchar</SelectItem>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="integer">Integer</SelectItem>
                          <SelectItem value="float">Float</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="timestamp">Timestamp</SelectItem>
                          <SelectItem value="uuid">UUID</SelectItem>
                          <SelectItem value="jsonb">JSONB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`field-${index}-inputType`}
                        className="text-right"
                      >
                        Input Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={field.inputOptions.type as string}
                        onValueChange={(value) => {
                          const updatedField = {
                            ...field,
                            inputOptions: {
                              ...field.inputOptions,
                              type: value as any,
                              // Initialize selectOptions if type is select
                              ...(value === "select" || value === "multi-select"
                                ? {
                                    selectOptions:
                                      field.inputOptions.selectOptions || [],
                                  }
                                : {}),
                            },
                          };
                          updateField(index, updatedField);
                        }}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Input Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="textarea">Textarea</SelectItem>
                          <SelectItem value="checkbox">Checkbox</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="multi-select">
                            Multi-Select
                          </SelectItem>
                          <SelectItem value="number">Number</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`field-${index}-label`}
                        className="text-right"
                      >
                        Input Label <span className="text-red-500">*</span>
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id={`field-${index}-label`}
                          value={field.inputOptions.label}
                          onChange={(e) => {
                            const updatedField = {
                              ...field,
                              inputOptions: {
                                ...field.inputOptions,
                                label: e.target.value,
                              },
                            };
                            updateField(index, updatedField);
                          }}
                          className={
                            errors[`field-${index}-label`]
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="Name"
                        />
                        {errors[`field-${index}-label`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`field-${index}-label`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`field-${index}-placeholder`}
                        className="text-right"
                      >
                        Placeholder
                      </Label>
                      <Input
                        id={`field-${index}-placeholder`}
                        value={field.inputOptions.placeholder || ""}
                        onChange={(e) => {
                          const updatedField = {
                            ...field,
                            inputOptions: {
                              ...field.inputOptions,
                              placeholder: e.target.value,
                            },
                          };
                          updateField(index, updatedField);
                        }}
                        className="col-span-3"
                        placeholder="Enter name..."
                      />
                    </div>

                    {/* Select Options section - only shown for select/multi-select fields */}
                    {(field.inputOptions.type === "select" ||
                      field.inputOptions.type === "multi-select") && (
                      <div className="grid grid-cols-4 items-start gap-4 mt-2">
                        <Label className="text-right pt-2">
                          Select Options <span className="text-red-500">*</span>
                        </Label>
                        <div className="col-span-3 space-y-2">
                          {errors[`field-${index}-selectOptions`] && (
                            <p className="text-red-500 text-sm mb-2">
                              {errors[`field-${index}-selectOptions`]}
                            </p>
                          )}

                          {field.inputOptions.selectOptions?.map(
                            (option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex items-center space-x-2"
                              >
                                <Input
                                  placeholder="Label"
                                  value={option.label}
                                  onChange={(e) =>
                                    handleUpdateSelectOption(
                                      index,
                                      optionIndex,
                                      "label",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1"
                                />
                                <Input
                                  placeholder="Value"
                                  value={option.value}
                                  onChange={(e) =>
                                    handleUpdateSelectOption(
                                      index,
                                      optionIndex,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleRemoveSelectOption(index, optionIndex)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddSelectOption(index)}
                            className="w-full mt-2"
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Option
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                      <div className="text-right">Options</div>
                      <div className="col-span-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`field-${index}-required`}
                            checked={field.inputOptions.required || false}
                            onCheckedChange={(checked) => {
                              const updatedField = {
                                ...field,
                                inputOptions: {
                                  ...field.inputOptions,
                                  required: !!checked,
                                },
                              };
                              updateField(index, updatedField);
                            }}
                          />
                          <Label htmlFor={`field-${index}-required`}>
                            Required
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`field-${index}-readOnly`}
                            checked={field.inputOptions.readOnly || false}
                            onCheckedChange={(checked) => {
                              const updatedField = {
                                ...field,
                                inputOptions: {
                                  ...field.inputOptions,
                                  readOnly: !!checked,
                                },
                              };
                              updateField(index, updatedField);
                            }}
                          />
                          <Label htmlFor={`field-${index}-readOnly`}>
                            Read Only
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`field-${index}-unique`}
                            checked={field.dbConfig.unique || false}
                            onCheckedChange={(checked) => {
                              const updatedField = {
                                ...field,
                                dbConfig: {
                                  ...field.dbConfig,
                                  unique: !!checked,
                                },
                              };
                              updateField(index, updatedField);
                            }}
                          />
                          <Label htmlFor={`field-${index}-unique`}>
                            Unique
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`field-${index}-indexed`}
                            checked={field.dbConfig.indexed || false}
                            onCheckedChange={(checked) => {
                              const updatedField = {
                                ...field,
                                dbConfig: {
                                  ...field.dbConfig,
                                  indexed: !!checked,
                                },
                              };
                              updateField(index, updatedField);
                            }}
                          />
                          <Label htmlFor={`field-${index}-indexed`}>
                            Indexed
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <Button variant="outline" className="w-full" onClick={addField}>
                <Plus className="h-4 w-4 mr-2" /> Add Field
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="relations">
            <div className="space-y-6">
              {entity.relations?.map((relation, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">
                      Relation #{index + 1}
                    </h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeRelation(index)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`relation-${index}-key`}
                        className="text-right"
                      >
                        Relation Key <span className="text-red-500">*</span>
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id={`relation-${index}-key`}
                          value={relation.key}
                          onChange={(e) => {
                            const updatedRelation = {
                              ...relation,
                              key: e.target.value,
                            };
                            updateRelation(index, updatedRelation);
                          }}
                          className={
                            errors[`relation-${index}-key`]
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="posts"
                        />
                        {errors[`relation-${index}-key`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`relation-${index}-key`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`relation-${index}-type`}
                        className="text-right"
                      >
                        Relation Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={relation.type}
                        onValueChange={(value) => {
                          const updatedRelation = {
                            ...relation,
                            type: value as IEntityRelationType,
                          };
                          updateRelation(index, updatedRelation);
                        }}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select Relation Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="many-to-one">
                            Many-to-One
                          </SelectItem>
                          <SelectItem value="one-to-one">One-to-One</SelectItem>
                          <SelectItem value="many-to-many">
                            Many-to-Many
                          </SelectItem>
                          <SelectItem value="one-to-many">
                            One-to-Many
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`relation-${index}-targetEntityKey`}
                        className="text-right"
                      >
                        Target Entity <span className="text-red-500">*</span>
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id={`relation-${index}-targetEntityKey`}
                          value={relation.targetEntityKey}
                          onChange={(e) => {
                            const updatedRelation = {
                              ...relation,
                              targetEntityKey: e.target.value,
                            };
                            updateRelation(index, updatedRelation);
                          }}
                          className={
                            errors[`relation-${index}-targetEntityKey`]
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="posts"
                        />
                        {errors[`relation-${index}-targetEntityKey`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`relation-${index}-targetEntityKey`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor={`relation-${index}-targetFieldKey`}
                        className="text-right"
                      >
                        Target Field <span className="text-red-500">*</span>
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id={`relation-${index}-targetFieldKey`}
                          value={relation.targetFieldKey}
                          onChange={(e) => {
                            const updatedRelation = {
                              ...relation,
                              targetFieldKey: e.target.value,
                            };
                            updateRelation(index, updatedRelation);
                          }}
                          className={
                            errors[`relation-${index}-targetFieldKey`]
                              ? "border-red-500"
                              : ""
                          }
                          placeholder="userId"
                        />
                        {errors[`relation-${index}-targetFieldKey`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`relation-${index}-targetFieldKey`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <Button
                variant="outline"
                className="w-full"
                onClick={addRelation}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Relation
              </Button>
            </div>
          </TabsContent>

          {showPreview && (
            <TabsContent value="preview">
              <div className="bg-slate-100 dark:bg-slate-900 rounded-md p-4">
                <pre className="text-sm overflow-auto whitespace-pre-wrap">
                  {generateEntityCode()}
                </pre>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
          <Code className="h-4 w-4 mr-2" />{" "}
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>
        <Button onClick={handleCopyCode}>Generate & Copy Code</Button>
      </CardFooter>
    </Card>
  );
}

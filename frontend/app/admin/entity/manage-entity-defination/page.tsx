"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Code, Save, Plus } from "lucide-react";
import {
  IDbColumnType,
  IEntity,
  IEntityField,
  IEntityRelation,
} from "@/@types/entity";
import { toast } from "sonner";

// Import components from create-entity
import BasicInfoTab from "../../create-entity-defination/page";
import FieldsTab from "../../create-entity-defination/page";
import RelationsTab from "../../create-entity-defination/page";
import validateEntity from "../../create-entity-defination/page";
import generateEntityCode from "../../create-entity-defination/page";
import { entityList } from "@/lib/store/entity-list";

export default function ManageEntitiesPage() {
  const router = useRouter();
  const [entities, setEntities] = useState<IEntity[]>(entityList);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showPreview, setShowPreview] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize preview state for each entity
    const previewState: Record<string, boolean> = {};
    entityList.forEach((entity) => {
      previewState[entity.key] = false;
    });
    setShowPreview(previewState);

    // Initialize errors state for each entity
    const errorsState: Record<string, Record<string, string>> = {};
    entityList.forEach((entity) => {
      errorsState[entity.key] = {};
    });
    setErrors(errorsState);
  }, []);

  const handleUpdateEntity = (
    entityKey: string,
    updatedData: Partial<IEntity>
  ) => {
    setEntities((prev) =>
      prev.map((entity) =>
        entity.key === entityKey ? { ...entity, ...updatedData } : entity
      )
    );
  };

  const handleUpdateField = (
    entityKey: string,
    fieldIndex: number,
    updatedField: IEntityField<IDbColumnType>
  ) => {
    setEntities((prev) =>
      prev.map((entity) => {
        if (entity.key === entityKey) {
          const fields = [...entity.fields];
          fields[fieldIndex] = updatedField;
          return { ...entity, fields };
        }
        return entity;
      })
    );
  };

  const handleAddField = (entityKey: string) => {
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

    setEntities((prev) =>
      prev.map((entity) => {
        if (entity.key === entityKey) {
          return {
            ...entity,
            fields: [...entity.fields, newField],
          };
        }
        return entity;
      })
    );
  };

  const handleRemoveField = (entityKey: string, fieldIndex: number) => {
    setEntities((prev) =>
      prev.map((entity) => {
        if (entity.key === entityKey) {
          const fields = [...entity.fields];
          fields.splice(fieldIndex, 1);
          return { ...entity, fields };
        }
        return entity;
      })
    );
  };

  const handleUpdateRelation = (
    entityKey: string,
    relationIndex: number,
    updatedRelation: IEntityRelation
  ) => {
    setEntities((prev) =>
      prev.map((entity) => {
        if (entity.key === entityKey) {
          const relations = [...entity.relations];
          relations[relationIndex] = updatedRelation;
          return { ...entity, relations };
        }
        return entity;
      })
    );
  };

  const handleAddRelation = (entityKey: string) => {
    const newRelation: IEntityRelation = {
      key: "",
      type: "many-to-one",
      targetEntityKey: "",
      targetFieldKey: "",
    };

    setEntities((prev) =>
      prev.map((entity) => {
        if (entity.key === entityKey) {
          return {
            ...entity,
            relations: [...entity.relations, newRelation],
          };
        }
        return entity;
      })
    );
  };

  const handleRemoveRelation = (entityKey: string, relationIndex: number) => {
    setEntities((prev) =>
      prev.map((entity) => {
        if (entity.key === entityKey) {
          const relations = [...entity.relations];
          relations.splice(relationIndex, 1);
          return { ...entity, relations };
        }
        return entity;
      })
    );
  };

  const togglePreview = (entityKey: string) => {
    setShowPreview((prev) => ({
      ...prev,
      [entityKey]: !prev[entityKey],
    }));
  };

  const handleSaveEntity = (entityKey: string) => {
    const entity = entities.find((e) => e.key === entityKey);
    if (!entity) return;

    const validationErrors = validateEntity();
    if (validationErrors) {
      setErrors((prev) => ({
        ...prev,
        [entityKey]: validationErrors as unknown as Record<string, string>,
      }));

      if (Object.keys(validationErrors).length > 0) {
        toast.error("Please fix the validation errors before saving");
        return;
      }
    }

    // In a real app, you would save to API or localStorage here
    toast.success(
      `Entity "${
        entity.display?.singularName || entity.key
      }" updated successfully!`
    );

    // Update the entityList (this is just for demo, in a real app you'd update your data source)
    // In a real implementation, you might want to:
    // localStorage.setItem('entityDefinitions', JSON.stringify(entities));
  };

  const handleCopyCode = (entityKey: string) => {
    const entity = entities.find((e) => e.key === entityKey);
    if (!entity) return;

    const code = generateEntityCode();
    if (typeof code === "string") {
      navigator.clipboard.writeText(code);
      toast.success("Entity code copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading entity definitions...</p>
          </div>
        </div>
      </div>
    );
  }

  if (entities.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Entity Definitions</h1>
            <p className="text-slate-600 mt-1">No entities found</p>
          </div>
          <Button asChild>
            <Link href="/admin/create-entity">
              <Plus className="mr-2 h-4 w-4" /> Create New Entity
            </Link>
          </Button>
        </div>
        <Card className="text-center p-12">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">
              No entity definitions found
            </h2>
            <p className="mb-6">Create your first entity to get started</p>
            <Button asChild>
              <Link href="/admin/create-entity">
                <Plus className="mr-2 h-4 w-4" /> Create Entity
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Entity Definitions</h1>
          <p className="text-slate-600 mt-1">
            Edit your data structures using the tabs below
          </p>
        </div>
        <div className="flex space-x-2">
          <Button asChild variant="outline">
            <Link href="/admin/entity/manage-entity-defination">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to List View
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/create-entity">
              <Plus className="mr-2 h-4 w-4" /> Create New Entity
            </Link>
          </Button>
        </div>
      </div>

      <Card className="w-full">
        <Tabs defaultValue={entities[0]?.key} className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Entity Definitions</CardTitle>
              <TabsList
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(
                    entities.length,
                    5
                  )}, minmax(0, 1fr))`,
                }}
              >
                {entities.map((entity, index) => (
                  <TabsTrigger
                    key={entity.key}
                    value={entity.key}
                    onClick={() => setActiveTabIndex(index)}
                  >
                    {entity.display?.singularName || entity.key}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <CardDescription>
              Edit entity definitions, fields, and relationships
            </CardDescription>
          </CardHeader>

          {entities.map((entity) => (
            <TabsContent key={entity.key} value={entity.key}>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="fields">Fields</TabsTrigger>
                    <TabsTrigger value="relations">Relations</TabsTrigger>
                    {showPreview[entity.key] && (
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="basic">
                    <BasicInfoTab
                      entity={entity as any}
                      updateEntity={(data: any) =>
                        handleUpdateEntity(entity.key, data)
                      }
                      errors={errors[entity.key] || {}}
                    />
                  </TabsContent>

                  <TabsContent value="fields">
                    <FieldsTab
                      fields={entity.fields || []}
                      addField={() => handleAddField(entity.key)}
                      updateField={(index: number, field: any) =>
                        handleUpdateField(entity.key, index, field)
                      }
                      removeField={(index: number) =>
                        handleRemoveField(entity.key, index)
                      }
                      errors={errors[entity.key] || {}}
                    />
                  </TabsContent>

                  <TabsContent value="relations">
                    <RelationsTab
                      relations={entity.relations || []}
                      addRelation={() => handleAddRelation(entity.key)}
                      updateRelation={(index: number, relation: any) =>
                        handleUpdateRelation(entity.key, index, relation)
                      }
                      removeRelation={(index: number) =>
                        handleRemoveRelation(entity.key, index)
                      }
                      errors={errors[entity.key] || {}}
                    />
                  </TabsContent>

                  {showPreview[entity.key] && (
                    <TabsContent value="preview">
                      <div className="bg-slate-100 dark:bg-slate-900 rounded-md p-4">
                        <pre className="text-sm overflow-auto whitespace-pre-wrap">
                          {generateEntityCode(entity)}
                        </pre>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => togglePreview(entity.key)}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    {showPreview[entity.key] ? "Hide Preview" : "Show Preview"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleCopyCode(entity.key)}
                  >
                    Copy Generated Code
                  </Button>
                </div>
                <Button onClick={() => handleSaveEntity(entity.key)}>
                  <Save className="h-4 w-4 mr-2" /> Save Changes
                </Button>
              </CardFooter>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}

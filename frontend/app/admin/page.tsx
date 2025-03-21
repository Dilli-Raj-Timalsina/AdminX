"use client";

import Link from "next/link";
import {
  Database,
  Plus,
  PenTool,
  FileText,
  ArrowRight,
  Code,
  GitBranch,
  Layers,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 px-6 rounded-b-3xl shadow-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Entity Management System
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Create, manage, and organize your data entities through an intuitive
            visual interface
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admin/create-entity-defination">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Features Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          Main Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link href="/admin/create-entity-defination" className="block">
            <Card className="h-full transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-center">
                  Create Entity Definition
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600 text-center">
                  Design new data structures with fully customizable fields and
                  validation rules.
                </p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-center">
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                >
                  Start Creating <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/admin/manage-entity-defination" className="block">
            <Card className="h-full transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-center">
                  Manage Entities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600 text-center">
                  View, edit and organize your existing entities and their
                  relationships.
                </p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-center">
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                >
                  Manage Data <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/docs" className="block">
            <Card className="h-full transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-amber-600" />
                </div>
                <CardTitle className="text-xl text-center">
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-600 text-center">
                  Learn how to use the system with comprehensive guides and
                  examples.
                </p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-center">
                <Button
                  variant="ghost"
                  className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                >
                  View Docs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Capabilities Section */}
        <div className="bg-slate-50 rounded-xl p-8 mb-16 shadow-sm">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800">
            What You Can Build
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Code className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Dynamic Schema</h3>
              <p className="text-slate-600 text-sm">
                Create data structures without writing a single line of database
                code
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <GitBranch className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Custom Relationships
              </h3>
              <p className="text-slate-600 text-sm">
                Define one-to-many, many-to-many, and one-to-one connections
                between entities
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                <Layers className="text-purple-600 h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Field Types</h3>
              <p className="text-slate-600 text-sm">
                Support for text, numbers, dates, selects, checkboxes and more
              </p>
            </div>
          </div>
        </div>

        {/* Example Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">
            Example Entity Definition
          </h2>
          <Card>
            <CardHeader>
              <CardTitle>Product Entity</CardTitle>
              <CardDescription>
                A sample entity structure showing the definition format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                <pre>{`// Example Product Entity
export const ProductEntity: IEntity = {
  key: "products",
  dbConfig: {
    tableName: "products",
    indexes: []
  },
  display: {
    singularName: "Product",
    pluralName: "Products",
    description: "Products available for sale"
  },
  fields: [
    {
      key: "name",
      dbConfig: { columnName: "name", type: "varchar" },
      inputOptions: { type: "text", label: "Product Name" }
    },
    {
      key: "price",
      dbConfig: { columnName: "price", type: "float" },
      inputOptions: { type: "number", label: "Price ($)" }
    }
  ],
  relations: [
    {
      key: "category",
      type: "many-to-one",
      targetEntityKey: "categories",
      targetFieldKey: "id"
    }
  ]
};`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started Button */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">
            Ready to Start?
          </h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Begin building your data structure by creating your first entity
            definition
          </p>
          <Link href="/admin/create-entity-defination">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Create Your First Entity <Plus className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">Entity Management System</p>
          <p className="text-slate-400 text-sm">
            A powerful tool for developers to define and manage data structures
          </p>
        </div>
      </footer>
    </div>
  );
}

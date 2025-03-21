"use client";

import Link from "next/link";
import {
  BookOpen,
  Heart,
  Star,
  Smile,
  Lightbulb,
  Rocket,
  Zap,
  FileText,
  HelpCircle,
  ArrowRight,
  Code,
  Database,
  GitBranch,
  Layers,
  Coffee,
  ChevronLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Documentation() {
  return (
    <div className="container mx-auto p-6 max-w-4xl my-20">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="group flex items-center text-slate-600 hover:text-blue-600 transition-colors"
          >
            <div className="mr-2 bg-slate-100 rounded-full p-2 group-hover:bg-blue-100 transition-colors">
              <ChevronLeft className="h-4 w-4 text-slate-500 group-hover:text-blue-500" />
            </div>
            <span>Back to Home</span>
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="bg-purple-100 p-3 rounded-full mr-3">
          <BookOpen className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Entity Management System | AdminX
        </h1>
        <div className="ml-3 bg-pink-100 p-3 rounded-full">
          <Heart className="h-6 w-6 text-pink-500" />
        </div>
      </div>

      <div className="text-center mb-12">
        <p className="text-xl text-slate-600 mb-4">
          Your friendly guide to creating and managing data entities
        </p>
        <div className="flex justify-center space-x-2">
          <Star className="h-5 w-5 text-amber-400" />
          <Star className="h-5 w-5 text-amber-400" />
          <Star className="h-5 w-5 text-amber-400" />
          <Star className="h-5 w-5 text-amber-400" />
          <Star className="h-5 w-5 text-amber-400" />
        </div>
      </div>

      {/* Welcome Card */}
      <Card className="mb-8 border-2 border-blue-200 shadow-md">
        <CardHeader className="bg-blue-50 rounded-t-lg">
          <div className="flex items-center">
            <Smile className="h-6 w-6 text-blue-500 mr-2" />
            <CardTitle>Welcome to Your Entity Management System!</CardTitle>
          </div>
          <CardDescription>
            This guide will help you create amazing data structures without
            coding
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-slate-600 mb-4">
            The Entity Management System helps you design and manage your data
            structures through a friendly interface. No database coding
            required!
          </p>
          <div className="flex items-center p-4 bg-amber-50 rounded-lg border border-amber-200">
            <Lightbulb className="h-8 w-8 text-amber-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              Think of entities as the building blocks of your application's
              data - like "Products", "Users", or "Orders". This system helps
              you define how they're structured and how they relate to each
              other.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="getting-started" className="mb-12">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="getting-started" className="flex items-center">
            <Rocket className="h-4 w-4 mr-2" /> Getting Started
          </TabsTrigger>
          <TabsTrigger value="core-concepts" className="flex items-center">
            <Zap className="h-4 w-4 mr-2" /> Core Concepts
          </TabsTrigger>
          <TabsTrigger value="tutorials" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" /> Tutorials
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" /> FAQ
          </TabsTrigger>
        </TabsList>

        {/* Getting Started Tab */}
        <TabsContent value="getting-started">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Rocket className="h-5 w-5 mr-2 text-blue-500" />
                Getting Started
              </CardTitle>
              <CardDescription>
                Your first steps with the Entity Management System
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex">
                  <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Create your first entity
                    </h3>
                    <p className="text-slate-600 mb-2">
                      Start by creating a basic entity definition.
                    </p>
                    <Link href="/admin/create-entity-defination">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        Go to Entity Creator{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Add fields to your entity
                    </h3>
                    <p className="text-slate-600">
                      Define what properties your entity has - like name, price,
                      description, etc.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Create relationships
                    </h3>
                    <p className="text-slate-600">
                      Connect your entities together - like Products belonging
                      to Categories.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="bg-blue-100 rounded-full h-8 w-8 flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-blue-600">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      Implement Your Entity Definitions
                    </h3>
                    <p className="text-slate-600">
                      To utilize the entity definitions created by the Entity
                      Creator, follow the TypeScript definition rules strictly.
                    </p>
                    <p className="text-slate-600">
                      First, copy the entity definition and place it into{" "}
                      <code>/frontend/lib/store</code> for the frontend. For the
                      backend, place the same definition file in{" "}
                      <code>/backend/src/api/entity</code> folder. Ensure you
                      mention this in the <code>entityList</code> in both the
                      frontend and backend.
                    </p>
                    <p className="text-slate-600">
                      And just like that, your CRUD admin panel is successfully
                      created. Now, visit <code>/admin</code> to see the admin
                      panel sidebar.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Core Concepts Tab */}
        <TabsContent value="core-concepts">
          <div className="grid grid-cols-2 gap-6">
            <Card className="border-2 border-indigo-100">
              <CardHeader className="bg-indigo-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-indigo-500" />
                  Entities
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-600 mb-3">
                  An entity represents a type of data in your system. Examples:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Products</li>
                  <li>Customers</li>
                  <li>Orders</li>
                  <li>Blog Posts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100">
              <CardHeader className="bg-green-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-green-500" />
                  Fields
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-600 mb-3">
                  Fields define the properties of an entity. Examples:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>name (text)</li>
                  <li>price (number)</li>
                  <li>isActive (boolean)</li>
                  <li>createdAt (date)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100">
              <CardHeader className="bg-purple-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <GitBranch className="h-5 w-5 mr-2 text-purple-500" />
                  Relationships
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-600 mb-3">
                  How entities connect to each other:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>one-to-many (a Category has many Products)</li>
                  <li>many-to-one (many Products belong to a Category)</li>
                  <li>many-to-many (Products can have many Tags)</li>
                  <li>one-to-one (User has one Profile)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-100">
              <CardHeader className="bg-amber-50 rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-amber-500" />
                  Type Generation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-600 mb-3">
                  The system automatically generates TypeScript interfaces for
                  your entities:
                </p>
                <div className="bg-slate-800 text-slate-100 p-3 rounded text-xs font-mono">
                  <pre>{`interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  isActive: boolean;
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tutorials Tab */}
        <TabsContent value="tutorials">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coffee className="h-5 w-5 mr-2 text-amber-600" />
                  Creating a Product Catalog System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg border-slate-200">
                    <h3 className="font-medium">
                      Step 1: Create a Category entity
                    </h3>
                    <p className="text-sm text-slate-600">
                      Create an entity with key "categories" and fields for name
                      and description.
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg border-slate-200">
                    <h3 className="font-medium">
                      Step 2: Create a Product entity
                    </h3>
                    <p className="text-sm text-slate-600">
                      Create an entity with key "products" and fields for name,
                      price, and image.
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg border-slate-200">
                    <h3 className="font-medium">
                      Step 3: Create a many-to-one relationship
                    </h3>
                    <p className="text-sm text-slate-600">
                      Add a relationship from products to categories to connect
                      them.
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg border-green-100 bg-green-50">
                    <h3 className="font-medium text-green-700">Result</h3>
                    <p className="text-sm text-green-600">
                      You now have a complete product catalog system with
                      categorized products!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-purple-500" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    What is an entity management system?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600">
                      An entity management system allows you to define,
                      structure, and manage your application's data models
                      (entities) through a visual interface rather than writing
                      database code directly. It helps you create organized data
                      structures with proper relationships.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Can I modify an entity after creating it?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600">
                      Yes! You can add new fields, modify existing ones, and
                      change relationships between entities after creation. Just
                      visit the "Manage Entities" section to edit your existing
                      entity definitions.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What field types are supported?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600">
                      We support various field types including:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                      <li>Text (short and long)</li>
                      <li>Numbers (integer and float)</li>
                      <li>Boolean (yes/no)</li>
                      <li>Date and Time</li>
                      <li>Select (dropdown)</li>
                      <li>Multi-select</li>
                      <li>And more!</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How do I use my entity definitions in my app?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600">
                      After creating your entities, you can export the
                      TypeScript interfaces and use them in your application.
                      The system generates both the type definitions and the
                      entity configuration that can be used to render forms,
                      create tables, and structure your API.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">
          Ready to Create Your First Entity?
        </h2>
        <p className="mb-4">
          Start building your data structure in just a few clicks!
        </p>
        <Link href="/admin/create-entity-defination">
          <Button className="bg-white text-blue-600 hover:bg-blue-50">
            Get Started <Rocket className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Cute Footer */}
      <div className="mt-12 text-center text-slate-500 flex flex-col items-center">
        <div className="flex space-x-2 mb-2">
          <Heart className="h-4 w-4 text-pink-400" />
          <Star className="h-4 w-4 text-amber-400" />
          <Heart className="h-4 w-4 text-pink-400" />
        </div>
        <p className="text-sm">Made with love for your data modeling needs</p>
      </div>
    </div>
  );
}

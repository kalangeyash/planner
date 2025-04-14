import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generateProjectInsights, type ProjectData } from "@/lib/openai";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Project name must be at least 2 characters"),
  description: z.string().min(50, "Please provide a detailed description"),
  requirements: z.string().min(20, "Please list your requirements"),
  industry: z.string().min(2, "Industry is required"),
  budget: z.number().min(1000, "Minimum budget is $1,000"),
});

export function ProjectForm({
  onNavigate,
  setProjectData,
}: {
  onNavigate: (page: string) => void;
  setProjectData: (data: any) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      requirements: "",
      industry: "",
      budget: 10000,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const projectData: ProjectData = {
        ...values,
        requirements: values.requirements.split("\n").filter(Boolean),
      };

      const insights = await generateProjectInsights(projectData);
      setProjectData({ ...projectData, insights });

      toast.success("Analysis complete! Viewing dashboard...");
      onNavigate("dashboard");
    } catch (error) {
      toast.error("Failed to analyze project. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container max-w-2xl py-10"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Project Details</h1>
          <p className="text-muted-foreground">
            Tell us about your project and we'll help you plan it.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              defaultValue="Neet Aspirant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., E-commerce Platform" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              defaultValue="create a platform for neet student to help them prepare for exams"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project in detail..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              defaultValue={`user authentication
              video lectures
              notes`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements (one per line)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="- User authentication&#13;&#10;- Product management&#13;&#10;- Payment integration"
                      className="min-h-[100px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industry"
              defaultValue="Education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Healthcare, Finance, Education"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1000"
                      step="1000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onNavigate("landing")}
              >
                Back
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Project
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}

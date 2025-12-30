import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

const customerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional().or(z.literal("")),
  company: z.string().trim().max(100, "Company must be less than 100 characters").optional().or(z.literal("")),
  designation: z.string().trim().max(100, "Designation must be less than 100 characters").optional().or(z.literal("")),
  linkedin_url: z.string().trim().url("Invalid URL").max(500, "URL must be less than 500 characters").optional().or(z.literal("")),
  instagram_id: z.string().trim().max(50, "Instagram ID must be less than 50 characters").optional().or(z.literal("")),
});

type CustomerFormData = z.infer<typeof customerSchema>;

interface CustomerRegistrationFormProps {
  onSuccess: () => void;
}

export function CustomerRegistrationForm({ onSuccess }: CustomerRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
      linkedin_url: "",
      instagram_id: "",
    },
  });

  const onSubmit = async (data: CustomerFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("customers").insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        designation: data.designation || null,
        linkedin_url: data.linkedin_url || null,
        instagram_id: data.instagram_id || null,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Customer registered successfully!",
      });
      reset();
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register customer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Register New Customer
        </CardTitle>
        <CardDescription>
          Enter customer details to add them to the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Acme Inc."
              {...register("company")}
              className={errors.company ? "border-destructive" : ""}
            />
            {errors.company && (
              <p className="text-sm text-destructive">{errors.company.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              placeholder="Software Engineer"
              {...register("designation")}
              className={errors.designation ? "border-destructive" : ""}
            />
            {errors.designation && (
              <p className="text-sm text-destructive">{errors.designation.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn Profile URL</Label>
            <Input
              id="linkedin_url"
              placeholder="https://linkedin.com/in/johndoe"
              {...register("linkedin_url")}
              className={errors.linkedin_url ? "border-destructive" : ""}
            />
            {errors.linkedin_url && (
              <p className="text-sm text-destructive">{errors.linkedin_url.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram_id">Instagram ID</Label>
            <Input
              id="instagram_id"
              placeholder="@johndoe"
              {...register("instagram_id")}
              className={errors.instagram_id ? "border-destructive" : ""}
            />
            {errors.instagram_id && (
              <p className="text-sm text-destructive">{errors.instagram_id.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Customer"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

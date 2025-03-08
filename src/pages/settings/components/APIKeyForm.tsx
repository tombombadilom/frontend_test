'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const apiKeyFormSchema = z.object({
  keys: z.array(z.string()),
});

type APIKeyFormValues = z.infer<typeof apiKeyFormSchema>;

interface APIKeyFormProps {
  apiKeys: string[];
  onAdd: (key: string) => void;
  onDelete: (key: string) => void;
}

export default function APIKeyForm({ apiKeys, onAdd, onDelete }: APIKeyFormProps) {
  const form = useForm<APIKeyFormValues>({
    resolver: zodResolver(apiKeyFormSchema),
    defaultValues: {
      keys: apiKeys,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>
          Manage your API keys for external integrations
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form className="space-y-4">
          <CardContent>
            <FormField
              control={form.control}
              name="keys"
              render={() => (
                <FormItem>
                  <div className="space-y-2">
                    {apiKeys.map((key) => (
                      <div key={key} className="flex items-center justify-between p-2 border rounded">
                        <code className="text-sm">{key}</code>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          type="button"
                          onClick={() => onDelete(key)}
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FormDescription>
                    Your API keys are used to authenticate your requests.
                  </FormDescription>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="button"
              onClick={() => onAdd(`test-key-${Date.now()}`)}
            >
              Generate New Key
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
} 
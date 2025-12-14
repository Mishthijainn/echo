import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@workspace/backend/_generated/api";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Separator } from "@workspace/ui/components/separator";
import { Textarea } from "@workspace/ui/components/textarea";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { VapiFormFields } from "./vapi-form-fields";
import { FormSchema } from "../../types";
import { widgetSettingSchema } from "../../schema";
import { MessageSquareIcon, SparklesIcon, MicIcon, SaveIcon, Loader2Icon } from "lucide-react";



type WidgetSettings = Doc<"widgetSettings">

interface CustomizationFormProps {
    initialData?: WidgetSettings | null
    hasVapiPlugin: boolean
}

export const CustomizationForm = ({
    initialData,
    hasVapiPlugin
}: CustomizationFormProps) => {
    const upsertWidgetSettings = useMutation(api.private.widgetSettings.upsert)
    const form = useForm<FormSchema>({
        resolver: zodResolver(widgetSettingSchema),
        defaultValues: {
            greetMessage: initialData?.greetMessage || "Hi! How can i help you today?",
            defaultSuggestions: {
                suggestion1: initialData?.defaultSuggestions.suggestion1 || "",
                suggestion2: initialData?.defaultSuggestions.suggestion2 || "",
                suggestion3: initialData?.defaultSuggestions.suggestion3 || "",
            },
            vapiSettings: {
                assistantId: initialData?.vapiSettings.assistantId || "",
                phoneNumber: initialData?.vapiSettings.phoneNumber || ""
            }
        }
    })
    const onSubmit = async (values: FormSchema) => {
        try {
            const vapiSettings: WidgetSettings["vapiSettings"] = {
                assistantId: values.vapiSettings.assistantId === "none" ? "" : values.vapiSettings.assistantId,
                phoneNumber: values.vapiSettings.phoneNumber === "none" ? "" : values.vapiSettings.phoneNumber
            }
            await upsertWidgetSettings({
                greetMessage: values.greetMessage,
                defaultSuggestions: values.defaultSuggestions,
                vapiSettings
            })
            toast.success("Widget settings saved.")
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")

        }
    }
    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="border-2 shadow-lg transition-shadow hover:shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <div className="flex items-center gap-2">
                            <MessageSquareIcon className="size-5 text-primary" />
                            <CardTitle className="text-xl">General Chat Settings</CardTitle>
                        </div>
                        <CardDescription>Configure basic chat widget behavior and messages</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="greetMessage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold">Greeting Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Welcome message shown when chat opens"
                                            rows={3}
                                            className="resize-none"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The first message customers see when they open the chat widget
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator className="my-6" />
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <SparklesIcon className="size-4 text-primary" />
                                    <h3 className="text-base font-semibold">Default Suggestions</h3>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    Quick reply suggestions shown to customers to help guide the conversation
                                </p>
                            </div>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="defaultSuggestions.suggestion1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Suggestion 1</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., How do I get started?" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="defaultSuggestions.suggestion2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Suggestion 2</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., What are your pricing plans?" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="defaultSuggestions.suggestion3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Suggestion 3</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g., I need help with my account" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {hasVapiPlugin && (
                    <Card className="border-2 shadow-lg transition-shadow hover:shadow-xl">
                        <CardHeader className="space-y-1 pb-4">
                            <div className="flex items-center gap-2">
                                <MicIcon className="size-5 text-primary" />
                                <CardTitle className="text-xl">Voice Assistant Settings</CardTitle>
                            </div>
                            <CardDescription>Configure voice calling features powered by Vapi</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <VapiFormFields form={form} />
                        </CardContent>
                    </Card>
                )}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        size="lg"
                        className="min-w-[120px] shadow-md transition-all hover:shadow-lg"
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2Icon className="mr-2 size-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <SaveIcon className="mr-2 size-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

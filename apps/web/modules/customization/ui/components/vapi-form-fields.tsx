import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useVapiAssistants, useVapiPhoneNumbers } from "@/modules/plugins/hooks/use-vapi-data";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { FormSchema } from "../../types";
interface VapiFormFieldsProps {
    form: UseFormReturn<FormSchema>
}
export const VapiFormFields = ({
    form
}: VapiFormFieldsProps) => {
    const { data: assistants, isLoading: assistantsLoading } = useVapiAssistants()
    const { data: phoneNumbers, isLoading: phoneNumbersLoading } = useVapiPhoneNumbers()
    const disabled = form.formState.isSubmitting
    return (
        <>
            <FormField
                control={form.control}
                name="vapiSettings.assistantId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Voice Assistant</FormLabel>
                        <Select value={field.value} disabled={assistantsLoading || disabled} onValueChange={field.onChange}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={assistantsLoading ? "Loading assistants" : "Select an assistant"}></SelectValue>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {assistants.map((assistant) => (
                                    <SelectItem key={assistant.id} value={assistant.id}>
                                        {assistant.name || "Unnamed Assistant"}-{" "}
                                        {assistant.model?.model || "Unkown model"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            The Vapi assistant to use voice calls
                        </FormDescription>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="vapiSettings.phoneNumber"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Display Phone Number</FormLabel>
                        <Select value={field.value} disabled={phoneNumbersLoading || disabled} onValueChange={field.onChange}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={phoneNumbersLoading ? "Loading phone numbers" : "Select a phone number"}></SelectValue>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {phoneNumbers.map((phoneNumber) => (
                                    <SelectItem key={phoneNumber.id} value={phoneNumber.id}>
                                        {phoneNumber.name || "Unknown"}-{" "}
                                        {phoneNumber.name || "Unnamed"}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Phone number to display in the widget
                        </FormDescription>
                    </FormItem>
                )}
            />
        </>
    )
}
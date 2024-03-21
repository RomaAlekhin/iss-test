<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Todo, TodoAdd } from "../../types";
import Textarea from "@/components/ui/textarea/Textarea.vue";

const props = defineProps<{
  todo?: Todo;
}>();

const emit = defineEmits<{
  (e: "submit", todo: TodoAdd): void;
  (e: "remove", id: Todo["id"]): void;
}>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(50).optional(),
  })
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: props.todo?.name,
    description: props.todo?.description,
  },
});

const onSubmit = form.handleSubmit(({ name, description }) => {
  emit("submit", { name, description });
});

const handleDelete = () => {
  if (!props.todo?.id) return;
  emit("remove", props.todo?.id);
};
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>

        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>

        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>

        <FormControl>
          <Textarea v-bind="componentField" />
        </FormControl>

        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-between gap-2 mt-4">
      <Button v-if="todo?.id" variant="destructive" @click="handleDelete">
        Remove
      </Button>

      <Button type="submit" class="ml-auto">Save changes</Button>
    </div>
  </form>
</template>

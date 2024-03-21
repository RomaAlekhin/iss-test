<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Filter, X } from "lucide-vue-next";
import { FilterStatus, FilterStatusValue, TodoStatus } from "../types";
import { todoStatusLabel } from "../utils";

const search = defineModel<string>("search");
const status = defineModel<FilterStatus>("status");

const statusFilterValues: FilterStatusValue[] = [
  { key: "ALL", label: todoStatusLabel.ALL },
  { key: TodoStatus.DONE, label: todoStatusLabel[TodoStatus.DONE] },
  {
    key: TodoStatus.IN_PROGRESS,
    label: todoStatusLabel[TodoStatus.IN_PROGRESS],
  },
];
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button size="icon" variant="outline">
        <Filter class="w-4 h-4" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="flex flex-col gap-4">
      <div class="relative w-full max-w-sm items-center">
        <Input
          type="text"
          placeholder="Search..."
          class="pr-10"
          v-model="search"
        />
        <span
          v-if="search"
          class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
          title="Clear search"
          @click="search = ''"
        >
          <X class="size-6 text-muted-foreground" />
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <Label>Todo status:</Label>
        <div class="flex gap-1">
          <div
            v-for="statusFilter in statusFilterValues"
            :key="statusFilter.key"
          >
            <Badge
              :variant="status === statusFilter.key ? 'default' : 'outline'"
              class="cursor-pointer"
              @click="status = statusFilter.key"
            >
              {{ statusFilter.label }}
            </Badge>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

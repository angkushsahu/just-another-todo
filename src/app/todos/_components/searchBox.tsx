"use client";

import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";

import { Input, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components";
import { type FilterValuesType, type MarkedValuesType, filterValues, markValues } from "@/lib";

export interface SearchBoxProps {
   search: string;
   priority: FilterValuesType;
   completed: MarkedValuesType;
   setSearch: Dispatch<SetStateAction<string>>;
   setPriority: Dispatch<SetStateAction<FilterValuesType>>;
   setCompleted: Dispatch<SetStateAction<MarkedValuesType>>;
}

export default function SearchBox(props: SearchBoxProps) {
   const { setCompleted, setPriority, setSearch } = props;

   const searchRef = useRef<HTMLInputElement>(null);
   const debounceTime = useRef<NodeJS.Timeout | null>(null);

   function onSearch() {
      if (!searchRef.current) return;
      const { value } = searchRef.current;

      if (debounceTime.current) clearTimeout(debounceTime.current);
      debounceTime.current = setTimeout(() => {
         setSearch(value);
      }, 1000);
   }

   useEffect(() => {
      return () => {
         if (debounceTime.current) clearTimeout(debounceTime.current);
      };
   }, []);

   return (
      <section className="flex flex-col items-center gap-x-6 gap-y-4 bg-background pb-8 pt-6 lg:flex-row">
         <Input placeholder="Search all todos ...." className="lg:max-w-lg" ref={searchRef} onChange={onSearch} />
         <div className="flex w-full flex-col items-center justify-end gap-x-4 gap-y-4 sm:flex-row lg:gap-x-6">
            <Select onValueChange={(e) => setPriority(e as FilterValuesType)}>
               <SelectTrigger className="sm:max-w-[15rem]">
                  <SelectValue placeholder="Task Priority Status" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     {filterValues.map((item) => (
                        <SelectItem key={item.title} value={item.value}>
                           {item.title}
                        </SelectItem>
                     ))}
                  </SelectGroup>
               </SelectContent>
            </Select>
            <Select onValueChange={(e) => setCompleted(e as MarkedValuesType)}>
               <SelectTrigger className="sm:max-w-[15rem]">
                  <SelectValue placeholder="Completion Status" />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     {markValues.map((item) => (
                        <SelectItem key={item.title} value={item.value}>
                           {item.title}
                        </SelectItem>
                     ))}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>
      </section>
   );
}

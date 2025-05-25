"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import * as React from "react"
import {
  FormControl,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ModalForm(){

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    priority: '',
    deadline: new Date(),
    status: '',
    created_by: '',
    updated_by: ''
  })

  function handleInputChanges({name, value}){
    setFormData((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  async function handleSubmit(){
   try{
    const res = await fetch("http://localhost:8080/task/create",{
      method: "POST",
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify(formData)
    })

    if(res.ok){
      router.push('/dashboard')
    }
   }catch(error){
    console.error(error)
   }
  }

    return(
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button variant="outline">
            <Plus/>
            <p>Add Task</p>
          </Button>   
        </div>
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input name="title" onChange={(e)=>handleInputChanges(e.target)} id="title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input id="desc" name="desc" onChange={(e)=>handleInputChanges(e.target)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dsc" className="text-right">
              Priority
            </Label>
                <Select name="priority" onValueChange={(e)=>handleInputChanges({value: e, name: "priority"})} className="w-full">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select prioity</SelectLabel>
          <SelectItem value="urgent">Urgent</SelectItem>
          <SelectItem value="tidur">Tidur</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dsc" className="text-right">
              Date
            </Label>
         <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !formData.deadline && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {formData.deadline ? format(formData.deadline, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={new Date(formData.deadline)}
                                    onSelect={(day) => {
                                        if (day) {
                                            handleInputChanges({ name: 'deadline', value: day });
                                        }
                                    }}
                                    initialFocus
                                />

                            </PopoverContent>
                        </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}
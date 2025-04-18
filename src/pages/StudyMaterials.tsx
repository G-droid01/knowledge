import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Video, Download, Book, File, Upload, Plus, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { AppLayout } from "@/components/layout/AppLayout";

// Mock data for programs and specializations
const programs = [
  { id: "1", name: "Computer Science" },
  { id: "2", name: "Business Administration" },
  { id: "3", name: "Engineering" },
  { id: "4", name: "Medicine" },
];

const specializations = {
  "1": [
    { id: "cs1", name: "Software Engineering" },
    { id: "cs2", name: "Artificial Intelligence" },
    { id: "cs3", name: "Data Science" },
  ],
  "2": [
    { id: "ba1", name: "Marketing" },
    { id: "ba2", name: "Finance" },
    { id: "ba3", name: "Management" },
  ],
  "3": [
    { id: "eng1", name: "Computer" },
    { id: "eng2", name: "Mechanical" },
    { id: "eng3", name: "Electrical" },
    { id: "eng4", name: "Civil" },
  ],
  "4": [
    { id: "med1", name: "General Medicine" },
    { id: "med2", name: "Surgery" },
    { id: "med3", name: "Pediatrics" },
  ],
};

// Add categories based on course categories
const categories = [
  { id: "dev", name: "Development" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "business", name: "Business" },
];

// Update mock materials to include categories
const mockMaterials = [
  {
    id: "1",
    title: "Introduction to Programming",
    type: "pdf",
    size: "2.5 MB",
    program: "Computer Science",
    specialization: "Software Engineering",
    category: "Development",
    downloadUrl: "#",
    youtubeUrl: "https://www.youtube.com/watch?v=example1"
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    type: "video",
    duration: "45 mins",
    program: "Computer Science",
    specialization: "Software Engineering",
    category: "Development",
    downloadUrl: "#",
    youtubeUrl: "https://www.youtube.com/watch?v=example2"
  },
  {
    id: "3",
    title: "Machine Learning Basics",
    type: "pdf",
    size: "1.8 MB",
    program: "Computer Science",
    specialization: "Artificial Intelligence",
    category: "Development",
    downloadUrl: "#",
    youtubeUrl: "https://www.youtube.com/watch?v=example3"
  },
  {
    id: "4",
    title: "Database Management Systems",
    type: "book",
    pages: "320",
    program: "Computer Science",
    specialization: "Software Engineering",
    category: "Development",
    downloadUrl: "#",
    youtubeUrl: "https://www.youtube.com/watch?v=example4"
  },
];

const StudyMaterials = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>("all");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    program: "",
    specialization: "",
    file: null as File | null,
  });
  const [isAddingProgram, setIsAddingProgram] = useState(false);
  const [isAddingSpecialization, setIsAddingSpecialization] = useState(false);
  const [newProgram, setNewProgram] = useState("");
  const [newSpecialization, setNewSpecialization] = useState("");
  const [localPrograms, setLocalPrograms] = useState(programs);
  const [localSpecializations, setLocalSpecializations] = useState(specializations);

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />;
      case "video":
        return <Video className="h-6 w-6 text-blue-500" />;
      case "book":
        return <Book className="h-6 w-6 text-green-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesProgram = selectedProgram === "all" || material.program === localPrograms.find(p => p.id === selectedProgram)?.name;
    const matchesSpecialization = selectedSpecialization === "all" || material.specialization === localSpecializations[selectedProgram]?.find(s => s.id === selectedSpecialization)?.name;
    const matchesCategory = selectedCategory === "all" || material.category === categories.find(c => c.id === selectedCategory)?.name;
    const matchesSearch = !searchQuery || material.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProgram && matchesSpecialization && matchesCategory && matchesSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm((prev) => ({
        ...prev,
        file: e.target.files![0],
      }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadForm.title || !uploadForm.program || !uploadForm.specialization || !uploadForm.file) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields and select a file.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would typically send the file to your backend
      // For now, we'll just simulate an upload
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success!",
        description: "File has been uploaded successfully.",
      });

      // Reset form and close dialog
      setUploadForm({
        title: "",
        program: "",
        specialization: "",
        file: null,
      });
      setIsUploadDialogOpen(false);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddProgram = () => {
    if (newProgram.trim()) {
      const newId = (localPrograms.length + 1).toString();
      const updatedPrograms = [...localPrograms, { id: newId, name: newProgram.trim() }];
      setLocalPrograms(updatedPrograms);
      setLocalSpecializations({
        ...localSpecializations,
        [newId]: []
      });
      setUploadForm(prev => ({ ...prev, program: newId }));
      setNewProgram("");
      setIsAddingProgram(false);
    }
  };

  const handleAddSpecialization = () => {
    if (newSpecialization.trim() && uploadForm.program) {
      const newId = `spec${Date.now()}`;
      const updatedSpecializations = {
        ...localSpecializations,
        [uploadForm.program]: [
          ...(localSpecializations[uploadForm.program] || []),
          { id: newId, name: newSpecialization.trim() }
        ]
      };
      setLocalSpecializations(updatedSpecializations);
      setUploadForm(prev => ({ ...prev, specialization: newId }));
      setNewSpecialization("");
      setIsAddingSpecialization(false);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Study Materials</h1>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Study Material</DialogTitle>
                <DialogDescription>
                  Add a new study material to the repository. Please fill in all the required information.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter material title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program">Program</Label>
                  {isAddingProgram ? (
                    <div className="flex gap-2">
                      <Input
                        value={newProgram}
                        onChange={(e) => setNewProgram(e.target.value)}
                        placeholder="Enter new program name"
                      />
                      <Button
                        type="button"
                        onClick={handleAddProgram}
                        className="shrink-0"
                      >
                        Add
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Select
                        value={uploadForm.program}
                        onValueChange={(value) => setUploadForm(prev => ({ ...prev, program: value, specialization: "" }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Program" />
                        </SelectTrigger>
                        <SelectContent>
                          {localPrograms.map((program) => (
                            <SelectItem key={program.id} value={program.id}>
                              {program.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        onClick={() => setIsAddingProgram(true)}
                        className="shrink-0"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  {isAddingSpecialization ? (
                    <div className="flex gap-2">
                      <Input
                        value={newSpecialization}
                        onChange={(e) => setNewSpecialization(e.target.value)}
                        placeholder="Enter new specialization name"
                      />
                      <Button
                        type="button"
                        onClick={handleAddSpecialization}
                        className="shrink-0"
                      >
                        Add
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Select
                        value={uploadForm.specialization}
                        onValueChange={(value) => setUploadForm(prev => ({ ...prev, specialization: value }))}
                        disabled={!uploadForm.program}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          {uploadForm.program &&
                            localSpecializations[uploadForm.program]?.map((spec) => (
                              <SelectItem key={spec.id} value={spec.id}>
                                {spec.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        onClick={() => setIsAddingSpecialization(true)}
                        disabled={!uploadForm.program}
                        className="shrink-0"
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                  </div>
                  {uploadForm.file && (
                    <p className="text-sm text-muted-foreground">
                      Selected file: {uploadForm.file.name} ({(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" className="border bg-transparent hover:bg-gray-100" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Upload
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Select value={selectedProgram} onValueChange={setSelectedProgram}>
            <SelectTrigger>
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Programs</SelectItem>
              {localPrograms.map((program) => (
                <SelectItem key={program.id} value={program.id}>
                  {program.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedSpecialization}
            onValueChange={setSelectedSpecialization}
            disabled={!selectedProgram || selectedProgram === "all"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              {selectedProgram && selectedProgram !== "all" &&
                localSpecializations[selectedProgram].map((spec) => (
                  <SelectItem key={spec.id} value={spec.id}>
                    {spec.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredMaterials.length} materials
          </div>
          <div className="flex gap-2">
            {selectedCategory !== "all" && (
              <Badge className="bg-secondary text-secondary-foreground gap-1">
                {categories.find(c => c.id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 hover:text-foreground"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="flex flex-col">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {getFileIcon(material.type)}
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{material.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge className="border bg-gray-100 text-muted-foreground">{material.program}</Badge>
                      <Badge className="border bg-gray-100 text-muted-foreground">{material.specialization}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {material.type === "video"
                        ? `Duration: ${material.duration}`
                        : material.type === "book"
                          ? `Pages: ${material.pages}`
                          : `Size: ${material.size}`}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <div className="flex gap-2 w-full">
                  <Button className="flex-1 border bg-transparent text-black hover:bg-gray-100" asChild>
                    <a href={material.downloadUrl} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                  <Button className="flex-1 border bg-transparent text-black hover:bg-gray-100" asChild>
                    <a href={material.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      YouTube
                    </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No study materials found matching your criteria.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default StudyMaterials;

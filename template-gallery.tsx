import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Check, Circle } from "lucide-react";
import type { CertificateTemplate } from "@shared/schema";

interface TemplateGalleryProps {
  templates: CertificateTemplate[];
  selectedTemplate: CertificateTemplate | null;
  onSelectTemplate: (template: CertificateTemplate) => void;
}

export default function TemplateGallery({ 
  templates, 
  selectedTemplate, 
  onSelectTemplate 
}: TemplateGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Templates");

  const categories = [
    "All Templates",
    "Academic Degrees", 
    "Professional Certificates",
    "Achievement Awards",
    "Training Completion"
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Templates" || 
                           template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <aside className="w-80 bg-white border-r border-neutral-200 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-secondary">Certificate Templates</h2>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4 text-neutral-400" />
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`p-3 cursor-pointer hover:shadow-md transition-all ${
                selectedTemplate?.id === template.id 
                  ? 'border-2 border-primary' 
                  : 'border border-neutral-200'
              }`}
              onClick={() => onSelectTemplate(template)}
            >
              <img
                src={template.imageUrl}
                alt={template.name}
                className="w-full h-24 object-cover rounded-md mb-2"
              />
              <h3 className="font-medium text-secondary text-sm">{template.name}</h3>
              <p className="text-xs text-neutral-500 mb-2">{template.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant={template.isPremium ? "default" : "secondary"}>
                  {template.isPremium ? "Premium" : "Free"}
                </Badge>
                {selectedTemplate?.id === template.id ? (
                  <Check className="h-4 w-4 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-neutral-300" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </aside>
  );
}

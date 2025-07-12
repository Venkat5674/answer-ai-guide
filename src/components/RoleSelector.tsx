import { useState } from 'react';
import { ChevronDown, Briefcase } from 'lucide-react';
import { InterviewRole } from '@/types/interview';
import { interviewRoles } from '@/data/interviewData';

interface RoleSelectorProps {
  selectedRole: InterviewRole | null;
  onRoleSelect: (role: InterviewRole) => void;
}

export function RoleSelector({ selectedRole, onRoleSelect }: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <div className="mb-2">
        <label className="block text-sm font-medium text-foreground mb-2">
          Select Interview Role
        </label>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 group"
      >
        <div className="flex items-center space-x-3">
          {selectedRole ? (
            <>
              <span className="text-2xl">{selectedRole.icon}</span>
              <div className="text-left">
                <div className="font-medium text-foreground">{selectedRole.title}</div>
                <div className="text-sm text-muted-foreground">{selectedRole.description}</div>
              </div>
            </>
          ) : (
            <>
              <Briefcase className="h-6 w-6 text-muted-foreground" />
              <div className="text-left">
                <div className="font-medium text-muted-foreground">Choose a role</div>
                <div className="text-sm text-muted-foreground">Select your target position</div>
              </div>
            </>
          )}
        </div>
        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-popover border border-border rounded-lg shadow-elevated overflow-hidden animate-fade-in">
          {interviewRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                onRoleSelect(role);
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-3 p-4 text-left hover:bg-accent/50 transition-colors duration-200 border-b border-border last:border-b-0"
            >
              <span className="text-2xl">{role.icon}</span>
              <div>
                <div className="font-medium text-foreground">{role.title}</div>
                <div className="text-sm text-muted-foreground">{role.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
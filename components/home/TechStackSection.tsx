import { skillGroups } from "@/data/skills";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/layout/Container";
import { MotionSection } from "@/components/home/MotionSection";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TechStackSection() {
  return (
    <MotionSection id="stack" className="py-14 sm:py-16 lg:py-20" ariaLabelledby="stack-title">
      <Container>
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools and concepts I work with."
          description="Grouped from the project data so the portfolio stays easy to keep current."
          titleId="stack-title"
        />
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <Card key={group.title}>
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} className="border-white/10 bg-slate-950/50 text-slate-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </MotionSection>
  );
}

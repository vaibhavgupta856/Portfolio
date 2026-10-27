import { ACHIEVEMENTS, EDUCATION } from "@/data/constants";
import { SectionHeader } from "./section-header";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import Link from "next/link";

const EducationSection = () => {
  return (
    <SectionWrapper
      id="education"
      className="flex flex-col items-center justify-center min-h-screen py-20"
    >
      <div className="w-full max-w-4xl px-4 md:px-8 mx-auto">
        <SectionHeader
          id="education"
          title="Education"
          desc="Where the fundamentals came from."
          className="mb-12 md:mb-20 mt-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Card
            className={cn(
              "group bg-card text-card-foreground border-border",
              "hover:border-primary/20 transition-colors duration-300",
              "shadow-sm hover:shadow-md"
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-secondary/50 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold tracking-tight">
                      {EDUCATION.school}
                    </CardTitle>
                    <div className="text-base font-medium text-muted-foreground">
                      {EDUCATION.degree}
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground md:pt-1.5">
                  {EDUCATION.period.start} - {EDUCATION.period.end}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.coursework.map((course) => (
                  <Badge
                    key={course}
                    variant="outline"
                    className="text-xs font-normal text-muted-foreground bg-secondary/30 border-transparent"
                  >
                    {course}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <h3 className="mt-16 mb-6 text-center text-2xl md:text-3xl font-bold">
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <AchievementCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

const AchievementCard = ({
  label,
  value,
  detail,
  href,
}: (typeof ACHIEVEMENTS)[0]) => {
  const card = (
    <Card
      className={cn(
        "group h-full bg-card text-card-foreground border-border",
        "hover:border-primary/20 transition-colors duration-300"
      )}
    >
      <CardContent className="p-4 md:p-5 flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          {label}
          {href && (
            <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        <div className="font-display text-2xl md:text-3xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{detail}</div>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link href={href} target="_blank" className="block h-full">
      {card}
    </Link>
  ) : (
    card
  );
};

export default EducationSection;

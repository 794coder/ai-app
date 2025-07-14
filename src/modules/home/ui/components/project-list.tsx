"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";

export const Projectlist = () => {
  const trpc = useTRPC();
  const { user } = useUser();
  const { data: project } = useQuery(trpc.project.getMany.queryOptions());
  if (!user) return null;
  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">{user?.firstName}&apos;s Apps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {project?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">No Projects Found</p>
          </div>
        )}
        {project?.map((pr) => (
          <Button
            key={pr.id}
            variant={"outline"}
            asChild
            className="font-normal h-auto justify-start w-full text-start p-4"
          >
            <Link href={`/projects/${pr.id}`}>
              <div className="flex items-center gap-x-4">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <div className="flex flex-co">
                  <h3 className="truncate font-medium">{pr.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(pr.updatedAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

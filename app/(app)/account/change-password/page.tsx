import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChangePasswordForm } from "@/components/forms/ChangePasswordForm"
import { getUserProfile } from "@/app/actions/user"

export default async function ChangePasswordPage() {
    const user = await getUserProfile()
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-vertical:h-4 data-vertical:self-auto"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/account">Mon compte</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:flex" />
              <BreadcrumbItem>Changer le mot de passe</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-secondary rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">
              Changer votre mot de passe
            </h2>
            <ChangePasswordForm userId={user?.userId} />
          </div>
        </div>
      </div>
    </div>
  )
}

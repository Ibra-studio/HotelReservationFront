import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AccountForm } from "@/components/forms/AccountForm"
import { getUserProfile } from "@/app/actions/user"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { KeyIcon } from "lucide-react"

export default async function AccountPage() {
  const user = await getUserProfile()
  console.log("User profile data:", user) // Debug log to check the user data

  if (!user) {
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
                <BreadcrumbItem>Mon compte</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Impossible de charger votre profil
            </h1>
            <p className="text-gray-600">
              Veuillez vous reconnecter et réessayer.
            </p>
          </div>
        </div>
      </div>
    )
  }

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
              <BreadcrumbItem>Mon compte</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Information Section */}
          <div className="bg-secondary rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">
              Informations personnelles
            </h2>
            <AccountForm user={user} />
          </div>

          
            <Link href="/account/change-password">
              <Button variant="outline">
                Changer le mot de passe
              </Button>
            </Link>
          </div>
        </div>
      </div>
  )
}
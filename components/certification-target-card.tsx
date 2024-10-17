import client, { SchemaCertificationTarget } from "@/lib/api/orchestrator";
import { classNames } from "@/lib/util";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface CertificationTargetCardProps {
    target: SchemaCertificationTarget
}

export default async function CertificationTargetCard({ target }: CertificationTargetCardProps) {
    const { data: statistics } = await client.GET("/v1/orchestrator/certification_targets/statistics", {
        params: {
            query: {
                certificationTargetId: target.id
            }
        }
    })

    return <li key={target.id} className="overflow-hidden rounded-xl border border-gray-200">
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 px-6 py-4">
            <div className="flex flex-col space-y-1">
                <div className="text-sm font-medium leading-6 text-gray-900"><Link href={`/certification-targets/${target.id}/activity`} >{target.name}</Link></div>
                <div className="text-sm leading-5 text-gray-400">{target.description}</div>
            </div>
            <Menu as="div" className="relative ml-auto">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500" disabled>
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon aria-hidden="true" className="h-5 w-5" />
                </MenuButton>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <MenuItem>
                        <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                            View<span className="sr-only">, {target.name}</span>
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                            Edit<span className="sr-only">, {target.name}</span>
                        </a>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Discovered Resources</dt>
                <dd className="text-gray-700">
                    {statistics?.numberOfDiscoveredResources}
                </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Assessment Results</dt>
                <dd className="flex items-start gap-x-2">
                    <div className="font-medium text-gray-900">{statistics?.numberOfAssessmentResults}</div>
                </dd>
            </div>
        </dl>
    </li>
}
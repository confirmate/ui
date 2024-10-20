"use client";
import Button from "@/components/button";
import { NodeDetailProps } from "@/components/node-detail";
import { SchemaResource } from "@/lib/api/discovery";
import { SchemaAssessmentResult, SchemaMetric } from "@/lib/api/orchestrator";
import {
  BuildingLibraryIcon,
  CircleStackIcon,
  CloudIcon,
  CodeBracketIcon,
  CodeBracketSquareIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  DocumentIcon,
  FolderIcon,
  KeyIcon,
  LockClosedIcon,
  NewspaperIcon,
  PuzzlePieceIcon,
  RectangleGroupIcon,
  ServerStackIcon,
  ShareIcon,
  ShieldCheckIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/solid";
import Cytoscape, {
  EdgeDefinition,
  ElementDefinition,
  NodeDefinition,
  Stylesheet,
} from "cytoscape";
import cola from "cytoscape-cola";
import { useRouter } from "next/navigation";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useEffect,
  useState,
} from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { renderToString } from "react-dom/server";
import CheckboxInput from "./checkbox-input";
import NodeDetail from "./node-detail";

interface DiscoveryGraphProps {
  edges: EdgeDefinition[];
  nodes: NodeDefinition[];
  resources: SchemaResource[];
  results: SchemaAssessmentResult[];
  metrics: Map<string, SchemaMetric>;
  initialSelect?: SchemaResource;
}

type Icon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>
>;

Cytoscape.use(cola);

export default function DiscoveryGraph({
  edges,
  nodes,
  resources,
  results,
  metrics,
  initialSelect,
}: DiscoveryGraphProps) {
  let [overlay, setOverlay] = useState(true);
  let [shouldCenter, setShouldCenter] = useState(false);
  let [selected, setSelected] = useState<NodeDetailProps | undefined>(
    undefined,
  );
  const router = useRouter();

  var elements: ElementDefinition[] = [];
  elements = elements.concat(edges, nodes);

  const layout: cola.ColaLayoutOptions = {
    name: "cola",
    infinite: true,
    fit: false,
  };

  // Store a reference to the cytoscape API, so that we can interact with it
  let myCy: Cytoscape.Core | undefined;

  useEffect(() => {
    if (initialSelect !== undefined) {
      setSelected({
        resource: initialSelect,
        results: results.filter((r) => r.resourceId == initialSelect.id),
        metrics: metrics,
      });
      var node = myCy?.nodes(`node[id="${initialSelect.id}"]`);
      node?.select();
    }
  }, [initialSelect, results, metrics, myCy]);

  return (
    <>
      <div className="overflow-hidden rounded-xl shadow border border-gray-200">
        <div className="flex items-center justify-between gap-x-4 border-b border-gray-900/5 bg-gray-50 p-4">
          <div className="text-sm text-gray-500">
            This graph provides an overview over all discovered resources of the
            certification target, infrastructure as well as application
            source-code.
            <div className="mt-2">
              <CheckboxInput
                name="overlay"
                checked={overlay}
                onChange={() => setOverlay(!overlay)}
              >
                <span className="text-gray-500">
                  <span className="text-gray-900 font-medium">
                    Show overlay&nbsp;
                  </span>
                  of assessment results
                </span>
              </CheckboxInput>
            </div>
          </div>
          <div className="flex gap-x-1.5">
            <Button onClick={() => myCy?.reset()}>
              <ViewfinderCircleIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative flex items-start"></div>

        <div
          className=" 
   items-start 
   gap-4
   md:grid
   md:grid-cols-3
   md:divide-x
   border-gray-300
   "
        >
          <div id="graph-container" className="gap-4 md:col-span-2 md:grid-col">
            <CytoscapeComponent
              className="graph h-[calc(100vh-18rem)] px-6 py-4 text-sm leading-6 w-full"
              stylesheet={style(overlay)}
              elements={elements}
              layout={layout}
              minZoom={0.5}
              maxZoom={1}
              wheelSensitivity={0.6}
              cy={(cy) => {
                myCy = cy;
                cy.on("tap", function (e) {
                  let target = e.target;

                  if (target === cy) {
                    setSelected(undefined);
                  } else {
                    const resource = resources.find((r) => r.id == target.id());
                    if (resource) {
                      setSelected({
                        resource: resource,
                        results: results.filter(
                          (r) => r.resourceId == resource.id,
                        ),
                        metrics: metrics,
                      });

                      // Update the URL to point to the selected resource
                      window.history.replaceState(
                        null,
                        "",
                        `/certification-targets/${resource.certificationTargetId}/resources/${resource.id}`,
                      );
                    }
                  }
                });
              }}
            />
          </div>

          <div className="flex items-start gap-2 md:grid-col h-full">
            <NodeDetail {...selected} />
          </div>
        </div>
      </div>
    </>
  );
}

function style(overlay: boolean): Stylesheet[] {
  let styles: Stylesheet[] = [];
  styles.push({
    selector: "node",
    style: {
      content: `data(label)`,
      "font-family": `inter, sans-serif`,
      "font-size": "1em",
      "text-background-color": "white",
      "text-background-shape": "rectangle",
      "text-background-opacity": 1,
      "text-wrap": "ellipsis",
      "text-max-width": "100px",
      "text-margin-x": 0,
      "text-margin-y": -2,
      color: "#111827",
    },
  });

  styles = styles.concat([
    ...nodeStyle("Storage", CircleStackIcon, overlay),
    ...nodeStyle("ResourceGroup", RectangleGroupIcon, overlay),
    ...nodeStyle("Account", CloudIcon, overlay),
    ...nodeStyle("Networking", ShareIcon, overlay),
    ...nodeStyle("NetworkService", ServerStackIcon, overlay),
    ...nodeStyle("Compute", CpuChipIcon, overlay),
    ...nodeStyle("VirtualMachine", ComputerDesktopIcon, overlay),
    ...nodeStyle("Function", CommandLineIcon, overlay),
    ...nodeStyle("Application", CommandLineIcon, overlay),
    ...nodeStyle("Library", BuildingLibraryIcon, overlay),
    ...nodeStyle("TranslationUnitDeclaration", CodeBracketIcon, overlay),
    ...nodeStyle("CodeRepository", FolderIcon, overlay),
    ...nodeStyle("KeyVault", LockClosedIcon, overlay),
    ...nodeStyle("Key", KeyIcon, overlay),
    ...nodeStyle("Secret", PuzzlePieceIcon, overlay),
    ...nodeStyle("Certificate", NewspaperIcon, overlay),
    ...nodeStyle("Object", DocumentIcon, overlay),
    ...nodeStyle("CodeModule", CodeBracketSquareIcon, overlay),
    ...nodeStyle("NetworkSecurityGroup", ShieldCheckIcon, overlay),
  ]);

  return styles;
}

function nodeStyle(type: string, icon: Icon, overlay: boolean): Stylesheet[] {
  let styles: Stylesheet[] = [
    {
      selector: `node[type\\.${type}]`,
      style: {
        shape: "rectangle",
        "background-image": svg(icon, "#111827"),
        "background-fit": "cover",
        "background-color": "white",
      },
    },
    {
      selector: `node[type\\.${type}]:selected`,
      style: {
        shape: "rectangle",
        "background-image": svg(icon, "#007FC3"),
        color: "#007FC3",
      },
    },
  ];

  if (overlay) {
    styles = styles.concat([
      {
        selector: `node[type\\.${type}][status=1]`,
        style: {
          shape: "rectangle",
          "background-image": svg(icon, "#166534"),
          "background-fit": "cover",
          "background-color": "white",
          color: "#166534",
        },
      },
      {
        selector: `node[type\\.${type}][status=2]`,
        style: {
          shape: "rectangle",
          "background-image": svg(icon, "#991b1b"),
          "background-fit": "cover",
          "background-color": "white",
          color: "#991b1b",
        },
      },
      {
        selector: `node[type\\.${type}]:selected`,
        style: {
          shape: "rectangle",
          "background-image": svg(icon, "#007FC3"),
          color: "#007FC3",
        },
      },
    ]);
  }

  return styles;
}

function svg(Icon: Icon, color: string): string {
  let icon = renderToString(
    <Icon width={24} height={24} style={{ color: color }} />,
  );
  return "data:image/svg+xml;utf8," + encodeURIComponent(icon);
}

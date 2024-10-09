"use client";
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
} from "@heroicons/react/24/solid";
import Cytoscape, {
  EdgeDefinition,
  ElementDefinition,
  NodeDefinition,
  Stylesheet,
} from "cytoscape";
import cola from "cytoscape-cola";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useState,
} from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { renderToString } from "react-dom/server";

interface DiscoveryGraphProps {
  edges: EdgeDefinition[];
  nodes: NodeDefinition[];
}

type Icon = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>
>;

Cytoscape.use(cola);

export default function DiscoveryGraph({ edges, nodes }: DiscoveryGraphProps) {
  let [overlay, setOverlay] = useState(false);
  var elements: ElementDefinition[] = [];
  elements = elements.concat(edges, nodes);

  const layout = {
    name: "cola",
    infinite: true,
    fit: false,
  };

  return (
    <>
      <div className="relative left-4 z-10 mt-4 flex items-start">
        <div className="flex h-6 items-center">
          <input
            id="overlay"
            aria-describedby="overlay-description"
            name="overlay"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-clouditor focus:ring-clouditor"
            onClick={() => setOverlay(!overlay)}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="overlay" className="font-medium text-gray-900">
            Show overlay&nbsp;
          </label>
          <span id="overlay-description" className="text-gray-500">
            <span className="sr-only">Show overlay </span>
            of assessment results
          </span>
        </div>
      </div>

      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <CytoscapeComponent
          className="graph h-[calc(100vh-25rem)] max-w-7xl"
          stylesheet={style(overlay)}
          elements={elements}
          layout={layout}
          minZoom={0.5}
          maxZoom={2}
          wheelSensitivity={0.6}
        />
      </dl>
    </>
  );
}

function style(overlay: boolean): Stylesheet[] {
  let styles: Stylesheet[] = [];
  styles.push({
    selector: "node",
    style: {
      content: `data(label)`,
      "font-family": `"Inter var", sans-serif`,
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
    ...nodeStyle("Application", CodeBracketSquareIcon, overlay),
    ...nodeStyle("Library", BuildingLibraryIcon, overlay),
    ...nodeStyle("TranslationUnitDeclaration", CodeBracketIcon, overlay),
    ...nodeStyle("CodeRepository", FolderIcon, overlay),
    ...nodeStyle("KeyVault", LockClosedIcon, overlay),
    ...nodeStyle("Key", KeyIcon, overlay),
    ...nodeStyle("Secret", PuzzlePieceIcon, overlay),
    ...nodeStyle("Certificate", NewspaperIcon, overlay),
    ...nodeStyle("Object", DocumentIcon, overlay),
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
  let icon = renderToString(<Icon style={{ color: color }} />);
  console.log(icon);
  return "data:image/svg+xml;utf8," + encodeURIComponent(icon);
}

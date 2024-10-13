declare module "cytoscape-cola" {
  const cytoscapeCola: cytoscape.Ext;
  export = cytoscapeCola;
  export as namespace cytoscapeCola;

  declare namespace cytoscapeCola {
    interface ColaLayoutOptions extends cytoscape.BaseLayoutOptions {
      name: "cola";
      fit?: boolean;
      infinite?: boolean;
    }
  }
}

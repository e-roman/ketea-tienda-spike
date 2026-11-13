// Categorías del mega menú. Copiado de ketea-tienda/src/data/megaMenuData.js (solo se adaptaron las rutas).
export interface MegaMenuSection {
  title: string
  items: string[]
}

export interface MegaMenuCategory {
  id: string
  label: string
  path?: string
  highlight?: boolean
  sections: MegaMenuSection[]
}

export const megaMenuData: MegaMenuCategory[] = [
  // Ofertas y Novedades: ocultos del menú por ahora (están en la barra de navegación del header). Para volver a mostrarlos, descomentar.
  // {
  //   id: "oferta-semana",
  //   label: "Ofertas de la semana 🏷️",
  //   path: "/productos?nav=ofertas",
  //   sections: [],
  //   highlight: true
  // },
  // {
  //   id: "novedades",
  //   label: "Novedades 🔥",
  //   path: "/productos",
  //   sections: [],
  //   highlight: true
  // },

  {
    id: "piscinas",
    label: "Piscinas",
    sections: [
      {
        title: "Bombas para piscinas",
        items: [
          "Línea BAS",
          "Línea BAE",
          "Línea BAT",
          "Línea BAP",
          "Línea BAC",
          "Línea BAF"
        ]
      },
      {
        title: "Filtración piscinas",
        items: [
          "Piscinas comerciales",
          "Piscinas residenciales",
          "Piscinas olímpicas",
          "Cargas filtrantes",
          "Carros filtración portátil",
          "Filtración portátil"
        ]
      },
      {
        title: "Mantenimiento y limpieza",
        items: [
          "Robots",
          "Limpiafondos",
          "Cepillos",
          "Sacahojas",
          "Cubiertas para piscinas"
        ]
      },
      {
        title: "Climatización",
        items: [
          "Bombas de calor",
          "Colectores solares",
          "Cubiertas",
          "Deshumidificadores",
          "Termómetros"
        ]
      },
      {
        title: "Accesorios piscina",
        items: [
          "Skimmers",
          "Retornos orientables",
          "Rebosaderos",
          "Hidromasajeadores"
        ]
      },
      {
        title: "Productos químicos",
        items: [
          "Cloro disolución lenta",
          "Cloro rápida",
          "Reguladores de pH"
        ]
      }
    ]
  },
  {
    id: "bombas",
    label: "Bombas",
    sections: [
      {
        title: "Tipos de bombas",
        items: [
          "Bombas para piscinas",
          "Bombas para hidromasajes",
          "Bombas centrífugas",
          "Bombas sumergibles",
          "Controladores de presión"
        ]
      }
    ]
  },
  {
    id: "hidromasajes",
    label: "Hidromasajes",
    sections: [
      {
        title: "Hidromasajes",
        items: [
          "Bombas para hidromasajes",
          "Válvulas de retención y drenaje",
          "Accesorios de instalación"
        ]
      }
    ]
  },
  {
    id: "conduccion",
    label: "Conducción de fluidos",
    sections: [
      {
        title: "Válvulas PVC",
        items: ["Válvulas de retención", "Válvulas esféricas"]
      },
      {
        title: "Accesorios PVC",
        items: [
          "Bujes de reducción",
          "Cruces",
          "Curvas",
          "Cuplas",
          "Tapones",
          "Tee",
          "Tubo flexible"
        ]
      }
    ]
  },
  {
    id: "tratamiento-agua",
    label: "Tratamiento de agua",
    sections: [
      {
        title: "Tratamiento de agua",
        items: ["Ablandadores de agua", "Filtros para sodería"]
      }
    ]
  },
{
  id: "accesorios-limpieza",
  label: "Limpieza y mantenimiento",
  sections: [
    {
      title: "Herramientas de limpieza",
      items: [
        "Redes de mano",
        "Barridos y cepillos",
        "Mangueras y poleas",
        "Kits de prueba de agua",
        "Termómetros"
      ]
    },
    {
      title: "Productos y repuestos",
      items: [
        "Cartuchos filtrantes",
        "Repuestos de bombas",
        "Accesorios skimmer",
        "Kit de mantenimiento"
      ]
    }
  ]
},
{
  id: "automatizacion",
  label: "Automatización y control",
  sections: [
    {
      title: "Control automático",
      items: [
        "Dosificadores químicos",
        "Timers y programadores",
        "Control remoto vía app"
      ]
    }
  ]
},
{
  id: "iluminacion-agua",
  label: "Iluminación & Efectos",
  sections: [
    {
      title: "Luces y efectos",
      items: [
        "Luces LED piscina",
        "Jet y fountains",
        "Efectos de agua"
      ]
    }
  ]
},
{
  id: "seguridad-confort",
  label: "Seguridad & Confort",
  sections: [
    {
      title: "Accesorios",
      items: [
        "Cobertores",
        "Alarmas de piscina",
        "Escaleras & pasamanos"
      ]
    }
  ]
},
{
  id: "ocio",
  label: "Diversión y ocio",
  sections: [
    {
      title: "Juegos",
      items: [
        "Flotadores",
        "Juegos acuáticos",
        "Piscinas desmontables",
        "Toboganes"
      ]
    }
  ]
}
];




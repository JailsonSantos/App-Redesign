// sanity.config.js
import { defineConfig } from "sanity";
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  title: "blog",
  projectId: "80ji1j7a",
  dataset: "production",
  plugins: [
    deskTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});



/* import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';


export default defineConfig({
  name: 'default',
  title: 'Ecommerce Apple Redesign',

  projectId: 'i9zqwtvb',
  dataset: 'production',

  schema: {
    types: schemaTypes,
  },

  plugins: [
    deskTool(),
    visionTool()
  ],
}); */
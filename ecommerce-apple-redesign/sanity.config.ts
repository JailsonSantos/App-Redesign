import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';
import { visionTool } from '@sanity/vision';

export default defineConfig({
  name: 'default',
  title: 'Ecommerce Apple Redesign',

  projectId: 'i9zqwtvb',
  dataset: 'production',

  schema: {
    types: schemaTypes,
  },

  plugins: [deskTool(), visionTool()],
})

/* import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity/lib/exports';

export default defineConfig({
  name: 'default',
  title: 'Ecommerce Apple Redesign',

  projectId: 'i9zqwtvb',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
 */
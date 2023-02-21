// Schemas
import vendor from './vendor';
import product from './product';
import category from './category';
import blockContent from './blockContent';

// Locale
import Text from './locale/Text';
import String from './locale/String';
import BlockContent from './locale/BlockContent';
import supportedLanguages from './locale/supportedLanguages';

// Schema
import { user, account } from 'next-auth-sanity/schemas';

export const schemaTypes = [
  vendor,
  product,
  category,
  blockContent,

  Text,
  String,
  BlockContent,
  supportedLanguages,

  user,
  account
]

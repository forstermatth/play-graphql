// hello
import {
  inspect
} from 'util';

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

var data = {
  'zero': {
    version: '0.0.0-dev',
    name: 'GRAPHYQL'
  }
};

var apiInfo = new GraphQLObjectType({
  name: 'APIInfo',
  description: 'The base info about the API',
  fields: () => ({
    version: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The API semver',
    },
    datePublished: {
      type: GraphQLString,
      description: 'The last date published',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The API\'s name!',
    }
  })
});

var root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    base: {
      type: apiInfo,
      args: {id: {name: 'id', type: new GraphQLNonNull(GraphQLString)}},
      resolve: (root, {id}) => data[id]
    }
  }
});

var schema = new GraphQLSchema({
  query: root
});

var query = '{ base(id: "zero") { name, version } }';

graphql(schema, query).then(result => {
 console.log(inspect(result, {depth: null}));
});

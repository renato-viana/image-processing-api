###Use Postman to test the API!###

#Use POST To create the converted image
POST http://localhost:3000/api/images?filename=santamonica&width=600&height=400

#Use GET to fetch the converted image
GET http://localhost:3000/api/images?filename=santamonica&width=600&height=400

#Scripts

npm run start 
npm run prettier-format
npm run lint
npm run build ->  Exclude test files from build 
npm run test

#Configuration build test
https://stackoverflow.com/questions/35470511/setting-up-tsconfig-with-spec-test-folder

#throw error
https://stackoverflow.com/questions/53080948/generic-throw-giving-expected-an-object-to-be-thrown-lint-error

#typeof type guards
https://www.typescriptlang.org/docs/handbook/2/narrowing.html?#using-type-predicates

#error.code -> isErrnoException
https://stackoverflow.com/questions/69422525/in-typescript-try-catch-error-object-shows-object-is-of-type-unknown-ts25
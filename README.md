# HackNYU 2019

This is the repo for HackNYU's new site. It's written in React with
TypeScript, Redux, React-JSS and a whole bunch of other libraries.
We're using Firebase to store data and to do auth.

## Contributing

To contribute, clone the repo and install the dependencies:

```
$ npm install
```

To run a local development server that rebuilds on changes:

```
$ npm run dev
```

## Deploying

Make sure you have the firebase CLI installed, then login to your Firebase account.
```
$ npm install -g firebase-tools
$ firebase login
```

Build the production app:
```
$ npm run build
```

You will need to install dependencies and build the firebase functions (in `hacknyu/functions`):
```
$ npm install
$ npm run build
```

Then deploy:
```
$ firebase deploy
```

Only deploy [hosting](https://firebase.google.com/docs/cli/#partial_deploys): `firebase deploy --only hosting`

  
## Contributors

|  Username      | Year | Favorite food    |
|----------------|------|------------------|
| kristelfung    | 2022 | Sushi            |
| themichaelyang | 2020 | all of the above |
| NicholasLYang  | 2021 | Kimchi-jjigae    |
| Leshyabracaglia| 2020 | Cheeseburger     |
| MdAbedin       | 2022 | chocolate        |
| eisenhuang     | 2019 | Sushi            |
| yitongw2       | 2020 | Hot pot          |
| stefancherubin | 2019 | Wings            |

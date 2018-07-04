# Technical preparation

## Resources to use


- [Open Recognition week](https://hackmd.io/W043YfY3Q8a13gS4NCuZnw?view#Architecture-of-the-portal) : a description of a portal which works according to the concept of Bit Of Trust
- [Peer claims with Open Badges](https://hackmd.io/BYWqUeNDRimyKJL5xsSOiw#Peer-Recognition-Network-Proof-of-Concept) : a type of Open Badges Assertion with an emphasis on light reusable credential description
- [Open Badges Specification](https://www.imsglobal.org/sites/default/files/Badges/OBv2p0/index.html) : the specs of the Open Badges standard itself. The [Github version here](https://github.com/IMSGlobal/openbadges-specification)
- [Open Badges.org](https://openbadges.org/) : but also have a look at the more recent [Badge.wiki](https://badge.wiki/wiki/Main_Page) and there is also a [Badge.news](http://badge.news/) that you can sign up to or read into past issues
- [Verifiable Claims](https://www.w3.org/TR/verifiable-claims-data-model/) : W3C Verifiable claims working draft
- [Decentralized Identifier specs (DIDs)](https://w3c-ccg.github.io/did-spec/) : A standard based on digital signatures for "self-sovereign" digital identity
- [EscoBadges](http://escobadges.eu/) : last year's Open Badges project in which we aligned the [ESCO framework](https://ec.europa.eu/esco/portal/api) with open badges with a focus on adaptable design based on the skill / competence that was chosen
- [A Badge Builder](https://badgebuilder.cogni.zone/) : A Badge Builder made with Angular by Cognizone , [code is here](https://bitbucket.org/cognizone/badgebuilder/src/master/) 
- [Kick-off document Summer of Code](https://hackmd.io/X1WQ9skBQuKnodq1iHpRyg?view)
- ..

## Which stack are we going to use

- as frontend as possible ([serverless?](https://en.wikipedia.org/wiki/Serverless_computing))
- Based on some simple examples from the early days of Open Badges : [Badges via twitter](https://github.com/toolness/tweep-badger) , [Bake badges in the browser](https://github.com/toolness/openbadges-instabaker.js) ... more to find if you query [Toolness github on badges](https://github.com/toolness?utf8=%E2%9C%93&tab=repositories&q=open+badges&type=&language=)
- [Google Firebase](https://firebase.google.com/) : for quick development with serverless google functions (nodejs) when necessary , an easy db for storage & build in authentication mechanisms 
- [vue js](https://vuejs.org/) : frontend framework...  [Quasar-Framework](https://quasar-framework.org/) which is vuejs based and easy to use... but comes with a lot of boilerplate  
- Make it into an [Progressive Web App](https://en.wikipedia.org/wiki/Progressive_Web_Apps) ? Quasar-Framework has an introduction and easy template for that: [here](https://quasar-framework.org/guide/pwa-introduction.html) 

## What do we need to learn/research more before we can start  
- Git usage ?
- Workflows + who does whats..
- Vue js ?
- Standards (Open Badges, Verifiable claims, DID's)

# Communication & promotion

- a short 90 sec animation explaining the what&why ?
- Make sure things can be easily translated
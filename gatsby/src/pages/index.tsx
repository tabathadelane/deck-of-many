import React, {useEffect, useState} from "react"
import styled from "@emotion/styled"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
var MersenneTwister = require('mersenne-twister');
import { css, Global } from "@emotion/react";
import stars from  "../images/stars2.png"


interface Card {
  cardEffect?: string,
  disappears?: boolean,
  image?: {
    asset: {
      url:string,
      fluid?: {
        base64: string
            srcWebp: string
            srcSetWebp: string
      }
        }
    },
  name?: string,
  slug?: {
    current: string
  },
  }
interface QueryTypes {
  data: {
    allSanityCard: {
      allCards: object[];
    }
    cardBack: object;
  },
}

//Styled components
const PageBackgroundColor = styled("div")`
  text-align: center;
  min-height:100vh;
  min-width:100vw;
  background-attachment: fixed;
  background-image: url(${stars});
  background-size: cover;
  background-repeat: repeat;
  background-size: 153px 153px;
  `
const PageBackgroundImg = styled("div")`
  text-align: center;
  min-height:100vh;
  min-width:100vw;
  z-index: 100;
  `
const TitleStyles = styled("h1")`
  padding-top: 50px !important;
  font-family: var(--title-font);
  font-size: 64px;
  color: var(--golden);
  text-align: center;
  -webkit-text-stroke: .5px black;
  `
const SubTitleStyles = styled("h1")`
  font-family: var(--title-font);
  font-size: 32px;
  color: var(--golden);
  text-align: center;
  padding-bottom: 50px !important;
  `
const RandomCardStyles = styled("div")`
  text-align: center;
  display: flex;
  margin-top: 40px;
  align-items: flex-start;
  justify-content: space-evenly;
  `
const CardNameStyles = styled("h1")`
  font-family: var(--header-font);
  margin-top: 20px !important;
  text-align: center;
  height: 40px;
  `
const CardImgStyles = styled("div")`
  img {
    height: 460px;
    width: 325px;
    border-radius: var(--rounded-edges);
    box-shadow: 4px 7px 4px -2px rgba(0, 0, 0, 0.5);

  }
height: 460px;
width: 325px;
border-radius: var(--rounded-edges);
box-shadow: 4px 7px 4px -2px rgba(0, 0, 0, 0.5);
  `
const InfoCardStyles = styled("div")`
  height: 430px;
  width: 295px;
  border-radius: var(--rounded-edges);
  box-shadow: 4px 7px 4px -2px rgba(0, 0, 0, 0.5);
 
  `
const CardEffectStyles = styled("p")`
  font-family: var(--text-font);
  height: 240px;
  margin: 20px auto 0;
  padding: 0 15px;
  `
const ButtonStyles = styled("button")`
  background-color: var(--golden);
  color: white;
  border-radius: 12px;
  font-family: var(--button-font);
  font-size: 30px;
  display: block;
  width: 200px;
  height: 45px;
  margin: 40px auto 0;
  z-index: 2;
`
const LuckyStyles = styled("p")`
  color: white;
  font-family: var(--lucky-font);
  font-size: 64px;
  margin: 80px auto 0;
`


const DeckOfMany = ({data} :QueryTypes) => {
  const allCards = data.allSanityCard.allCards;
  const cardBack = data.cardBack;
  const disappearingCards = ["jester", "fool"]
  
  const [availableCards, setAvailableCards] = useState(allCards);
  console.log("available", availableCards)
  const [randomCard, setRandomCard] = useState(cardBack);
  const [isDrawingCards, setIsDrawingCards] = useState(false);
  
  
  var generator = new MersenneTwister();
  const randomNum = (numberOfCards: number): number => ( Math.floor(generator.random() * (numberOfCards)) as number);
  
  const handleDrawCard = () => {
    let numberOfCards = availableCards.length;
    const randomIndex: number = randomNum(numberOfCards);
    const randomCard: Card = availableCards[randomIndex];
    console.log(randomCard.slug?.current, numberOfCards)
    if (disappearingCards.includes(randomCard.slug.current)){
      console.log("before", availableCards)
      console.log("Poof", randomCard.slug?.current)
      setAvailableCards(availableCards.filter(x => x !== randomCard))
      console.log("after", availableCards)
      numberOfCards = availableCards.length;

    }
    setRandomCard(randomCard)
    setIsDrawingCards(true)
    
  }
  
  const handleCloseDeck = () => {
    setIsDrawingCards(false)
    setRandomCard(cardBack)
    setAvailableCards(allCards)
    
  };
  
  return (
    <PageBackgroundColor>
      <PageBackgroundImg >
      <Global styles={css`
        :root {
          --title-font: "Cherry Cream Soda", cursive;
          --text-font: "Gayathri", sans-serif;
          --header-font: "Junge", serif;
          --button-font: "Truculenta", sans-serif;
          --lucky-font: "Yesteryear", cursive;
          --golden: #8E7144;
          --rounded-edges: 16px;
          html {
            height: 100vh;
            position: relative;
            margin: 0;
          }
          body {
            min-height: 100vh;
            margin: 0;
            padding: 0;
          }
          h1, h2, h3, h4{
            margin: 0;
            padding: 0;
          }
        `} />
      <TitleStyles>The Deck of Many Things</TitleStyles>
      <SubTitleStyles>random card generator</SubTitleStyles>
      {isDrawingCards && (
        <RandomCardStyles>
                    <div>
            <CardImgStyles>
            <GatsbyImage alt={randomCard.slug + " image"} image={randomCard.image?.asset?.gatsbyImageData} />
              </CardImgStyles>  
          </div>

          <InfoCardStyles
            css={css`
            opacity: 1;
            border: 15px solid #0C100B;
            position: relative;
            `}>
              <div css={css`
              position: absolute;
              margin: 0 auto;
              top:20;
              left:0;
              right: 0;
              z-index: 100;
              `}>
                  <CardNameStyles key={randomCard.slug + " name"}>{randomCard.name}</CardNameStyles>
                <CardEffectStyles> {randomCard.cardEffect}</CardEffectStyles>
                <ButtonStyles onClick={handleDrawCard}>Draw a Card</ButtonStyles>
              </div>
            <InfoCardStyles 
              css={css`
              background: #F3ECE1;
              opacity: .5;
              border-radius: 0;
              position: absolute;
              margin: 0;
              top:0;
              left:0;
              z-index: 2;
            `}>
            </InfoCardStyles>
            <div 
              css={css`
              background: #F3ECE1;
              opacity: .4;
              border-radius: 0;
              position: absolute;
              margin: -15px;
              top:0;
              left:0;
              z-index: 1;`} 
            >
              <CardImgStyles>
                <GatsbyImage
                  alt="default card back image" image={cardBack.image?.asset?.gatsbyImageData} />
              </CardImgStyles>  
            </div>
          </InfoCardStyles>

        </RandomCardStyles>
      )}
      {!isDrawingCards && (
        <RandomCardStyles>
          <InfoCardStyles
            css={css`
              opacity: 1;
              border: 15px solid #0C100B;
              position: relative;
            `}>
              <div css={css`
                position: absolute;
                margin: 0 auto;
                top:20;
                left:0;
                right: 0;
                z-index: 100;
              `}>
                <LuckyStyles>Feeling Lucky?</LuckyStyles>
                <ButtonStyles onClick={handleDrawCard}>Draw a Card</ButtonStyles>
              </div>
            <InfoCardStyles 
              css={css`
              background: #F3ECE1;
              opacity: .4;
              border-radius: 0;
              position: absolute;
              margin: 0;
              top:0;
              left:0;
              z-index: 1;
            `}>
            </InfoCardStyles>
          </InfoCardStyles>
          <div>
            <CardImgStyles>
              <GatsbyImage alt="default card back image" image={cardBack.image?.asset?.gatsbyImageData} />
            </CardImgStyles>  
          </div>

        </RandomCardStyles>
      )}
      <ButtonStyles 
        css={css`
          height: 55; 
          width: 249px;
        `} 
        onClick={handleCloseDeck}>
        Refresh the Deck
      </ButtonStyles>
      </PageBackgroundImg>
  </PageBackgroundColor>
  
        

  )
}

export default DeckOfMany;

export const query = graphql`
  query AllCardQuery {
    allSanityCard(filter: {slug: {current: {ne: "card-back"}}}) {
      allCards: nodes {
        name
        disappears
        cardEffect
        image {
        asset {
          id
          gatsbyImageData(
          width: 350
          formats: WEBP
          placeholder: BLURRED
          outputPixelDensities: 0.25
        )          }
        }
        slug {
          current
        }
      }
    }
  cardBack: sanityCard(slug: {current: {eq: "card-back"}}) {
    slug {
      current
    }
    name
    image {
      asset {
        id
        gatsbyImageData(
          width: 350
          formats: WEBP
          placeholder: BLURRED
          outputPixelDensities: 0.25
        )      }
    }
    disappears
    cardEffect
  }
}
`


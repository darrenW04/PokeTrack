"use client";

import { useState } from "react";

const POKE_API = process.env.NEXT_PUBLIC_POKE_API;

const ptcgoSets: { [key: string]: string } = {
  BAS: "Base Set",
  JU: "Jungle",
  FO: "Fossil",
  TR: "Team Rocket",
  G: "Gym Heroes",
  N1: "Neo Genesis",
  N2: "Neo Discovery",
  N3: "Neo Revelation",
  N4: "Neo Destiny",
  EXP: "Expedition Base Set",
  AQP: "Aquapolis",
  SKR: "Skyridge",
  RS: "Ruby & Sapphire",
  SS: "Sandstorm",
  DR: "Dragon",
  MA: "Magma vs. Aqua",
  HL: "Hidden Legends",
  FRLG: "FireRed & LeafGreen",
  TRR: "Team Rocket Returns",
  DX: "Deoxys",
  EM: "Emerald",
  UF: "Unseen Forces",
  DS: "Delta Species",
  LM: "Legend Maker",
  HP: "Holon Phantoms",
  CG: "Crystal Guardians",
  DF: "Dragon Frontiers",
  PK: "Power Keepers",
  DP: "Diamond & Pearl",
  MT: "Mysterious Treasures",
  SW: "Secret Wonders",
  GE: "Great Encounters",
  MD: "Majestic Dawn",
  LA: "Legends Awakened",
  SF: "Stormfront",
  PL: "Platinum",
  RR: "Rising Rivals",
  SV: "Supreme Victors",
  AR: "Arceus",
  HGSS: "HeartGold & SoulSilver",
  UL: "Unleashed",
  UD: "Undaunted",
  TM: "Triumphant",
  CL: "Call of Legends",
  BW: "Black & White",
  EP: "Emerging Powers",
  NV: "Noble Victories",
  NXD: "Next Destinies",
  DEX: "Dark Explorers",
  DRV: "Dragon Vault",
  BCR: "Boundaries Crossed",
  PLS: "Plasma Storm",
  PLF: "Plasma Freeze",
  PLB: "Plasma Blast",
  LTR: "Legendary Treasures",
  XY: "XY",
  FLF: "Flashfire",
  FFI: "Furious Fists",
  PHF: "Phantom Forces",
  PRC: "Primal Clash",
  ROS: "Roaring Skies",
  AOR: "Ancient Origins",
  BKP: "BREAKpoint",
  BKT: "BREAKthrough",
  GEN: "Generations",
  FCO: "Fates Collide",
  STS: "Steam Siege",
  EVO: "Evolutions",
  SM: "Sun & Moon",
  GRI: "Guardians Rising",
  BUS: "Burning Shadows",
  CIN: "Crimson Invasion",
  UPR: "Ultra Prism",
  FLI: "Forbidden Light",
  CES: "Celestial Storm",
  LOT: "Lost Thunder",
  TEU: "Team Up",
  UNB: "Unbroken Bonds",
  UNM: "Unified Minds",
  HIF: "Hidden Fates",
  CEC: "Cosmic Eclipse",
  SSH: "Sword & Shield Base Set",
  RCL: "Rebel Clash",
  DAA: "Darkness Ablaze",
  VIV: "Vivid Voltage",
  BST: "Battle Styles",
  CRE: "Chilling Reign",
  EVS: "Evolving Skies",
  FST: "Fusion Strike",
  BRS: "Brilliant Stars",
  ASR: "Astral Radiance",
  LOR: "Lost Origin",
  SIT: "Silver Tempest",
  CRZ: "Crown Zenith",
  SV1: "Scarlet & Violet Base Set",
  SV2: "Paldea Evolved",
  SVP: "Scarlet & Violet Promos",
  "PR-SW": "Sword & Shield Promos",
  "PR-SV": "Scarlet & Violet Promos",
};

const constructFullName = (card: {
  name: string;
  set?: { name: string };
  number?: string;
  rarity?: string;
}) => {
  const baseName = card.name;
  const setName = card.set?.name ? ` (${card.set.name})` : "";
  const cardNumber = card.number ? ` - #${card.number}` : "";
  const rarity = card.rarity ? ` [${card.rarity}]` : "";
  return `${baseName}${setName}${cardNumber}${rarity}`;
};

const formatPrice = (value: number | null) =>
  value !== null ? `$${value.toFixed(2)}` : "N/A";

const Collection = () => {
  const [collection] = useState([]);
  const [query, setQuery] = useState("");
  const [cardResults, setCardResults] = useState<
    {
      id: string;
      name: string;
      hp?: string;
      rarity?: string;
      types?: string[];
      number?: string;
      attacks?: { name: string; damage: string; text: string }[];
      images?: { small: string; large: string };
      set?: { name: string; ptcgoCode?: string };
      cardmarket?: { url: string; prices: Record<string, number | null> };
      tcgplayer?: {
        url?: string;
        prices: {
          holofoil?: {
            low: number | null;
            market: number | null;
            high: number | null;
          };
        };
      };
    }[]
  >([]);
  const [error, setError] = useState("");

  const fetchCards = async (cardCharacter: string) => {
    const baseURL = "https://api.pokemontcg.io/v2/cards";
    const queryParam = `?q=name:${encodeURIComponent(cardCharacter)}`;
    const url = `${baseURL}${queryParam}`;

    try {
      const response = await fetch(url, {
        headers: POKE_API ? { "X-Api-Key": POKE_API } : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        const dataArray = data.data;
        setCardResults(dataArray);
        setError("");
      } else {
        setCardResults([]);
        setError("No Pokémon cards found.");
      }
    } catch (err) {
      setError("Failed to fetch Pokémon cards. Please try again.");
    }
  };

  const handleSearch = () => {
    if (query.trim() === "") {
      setError("Please enter a valid query.");
      return;
    }
    fetchCards(query);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Pokémon Card Search</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search for Pokémon (e.g., Charizard)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleSearch} style={{ padding: "5px 10px" }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Search Results:</h2>
      <ul>
        {cardResults.map((card) => (
          <li key={card.id} style={{ marginBottom: "30px" }}>
            <h3>{constructFullName(card)}</h3>
            <a
              href={card.tcgplayer?.url || card.cardmarket?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={card.images?.small}
                alt={`${card.name} card`}
                style={{ width: "100px", marginBottom: "10px" }}
              />
            </a>
            <p>
              <strong>HP:</strong> {card.hp} <br />
              <strong>Types:</strong> {card.types?.join(", ")} <br />
              <strong>Set:</strong> {ptcgoSets[card.set?.ptcgoCode || ""]} (
              {card.set?.name})
            </p>
            <div>
              <strong>Cardmarket:</strong>{" "}
              {card.cardmarket?.url ? (
                <a
                  href={card.cardmarket.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cardmarket Link
                </a>
              ) : (
                "N/A"
              )}
              <ul>
                {card.cardmarket?.prices &&
                  Object.entries(card.cardmarket.prices).map(([key, value]) => (
                    <li key={key}>
                      {key}: {formatPrice(value)}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <strong>TCGPlayer Prices:</strong>
              {card.tcgplayer?.prices?.holofoil ? (
                <ul>
                  <li>
                    Low: {formatPrice(card.tcgplayer.prices.holofoil.low)}
                  </li>
                  <li>
                    Market: {formatPrice(card.tcgplayer.prices.holofoil.market)}
                  </li>
                  <li>
                    High: {formatPrice(card.tcgplayer.prices.holofoil.high)}
                  </li>
                </ul>
              ) : (
                <p>N/A</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <h2>My Collection:</h2>
      <ul>
        {collection.map((id, index) => (
          <li key={index}>{id}</li>
        ))}
      </ul>
    </div>
  );
};

export default Collection;

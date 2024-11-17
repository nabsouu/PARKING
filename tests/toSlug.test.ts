import { describe, expect, test } from "bun:test";
import { toSlug } from "../src/utils/toSlug";

describe('toSlug', ()=>{



    test("toSlug doit supprimer les espaces en début et fin de mot", ()=>{
        expect(toSlug("        ESPACE       ")).toBe("espace");
    });

    test("toSlug doit rendre un mot en majuscule en minuscule",()=>{
        expect(toSlug("DOUNIA")).toBe("dounia");
    });

    test("toSlug doit enlever les caractères spéciaux",()=>{
        expect(toSlug("&ne")).toBe("ne");
    }); 

    test("toSlug doit transformer les espaces en tirets",()=>{
        expect(toSlug("Aix-en-Provence")).toBe("aix-en-provence");
    });

    test("toSlug doit enlever les accents",()=>{
        expect(toSlug("La planète va reçevoir un astéroïde !!!")).toBe("la-planete-va-recevoir-un-asteroide");
    });



});
import { generateRandomNumberId } from "../src/utils/generateRandomNumberId";
import { describe, expect, test } from "bun:test";



describe("generateRandomNumberId", ()=> {

    test("generateRandomNumberId doit retourner un nombre de 6 chiffres entre 10000 et 99999", ()=>{
        const id=generateRandomNumberId();
        expect(id).toBeGreaterThanOrEqual(100000);
        expect(id).toBeLessThanOrEqual(999999); 
    });

    test("generateRandomNumberId doit retourner un nombre",()=>{
        const id=generateRandomNumberId();
        expect(typeof id).toBe("number");
    });



})
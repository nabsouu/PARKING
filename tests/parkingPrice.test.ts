import { parkingPrice } from "../src/services/FacturationParking";
import { describe, expect, test } from "bun:test";

describe('Test de la fonction ParkingPrice', () => {
  
  test('calcul du prix pour une période de 2 heures', () => {
    const startedAt = new Date('2024-11-17T08:00:00');
    const endedAt = new Date('2024-11-17T10:00:00');
    const hourlyRate = 5; 
    
    expect(parkingPrice(startedAt, endedAt, hourlyRate)).toBe(10);  
  });

  test('calcul du prix pour une période de 90 minutes', () => {
    const startedAt = new Date('2024-11-17T08:00:00');
    const endedAt = new Date('2024-11-17T09:30:00');
    const hourlyRate = 5; 
    
    expect(parkingPrice(startedAt, endedAt, hourlyRate)).toBe(7.5);  
  });

  test('calcul du prix pour une période de 0 minute', () => {
    const startedAt = new Date('2024-11-17T08:00:00');
    const endedAt = new Date('2024-11-17T08:00:00');
    const hourlyRate = 5;
    
    expect(parkingPrice(startedAt, endedAt, hourlyRate)).toBe(0); 
  });

  test('calcul du prix pour une période de plus de 1 jour', () => {
    const startedAt = new Date('2024-11-17T08:00:00');
    const endedAt = new Date('2024-11-18T08:00:00');
    const hourlyRate = 5; 
    
    expect(parkingPrice(startedAt, endedAt, hourlyRate)).toBe(120);  
  });

  test('calcul avec un taux horaire de 0', () => {
    const startedAt = new Date('2024-11-17T08:00:00');
    const endedAt = new Date('2024-11-17T10:00:00');
    const hourlyRate = 0; 
    
    expect(parkingPrice(startedAt, endedAt, hourlyRate)).toBe(0);  
  });

  test('calcul avec un taux horaire inférieur à 0', () => {
    const startedAt = new Date('2024-11-17T08:00:00');
    const endedAt = new Date('2024-11-17T10:00:00');
    const hourlyRate = -12;
  
    expect(() => parkingPrice(startedAt, endedAt, hourlyRate)).toThrow('Le taux horaire ne peut pas être inférieur à 0');
  });
});

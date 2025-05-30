import { PontoTuristico } from "./datatypes";

// Define base URL for easier management and to avoid repetition.
// Make sure this IP address is accessible from your emulator/device.
const API_BASE_URL = 'http://192.168.21.15:5000';

/**
 * Fetches all PontoTuristico items.
 */
export async function getPontosTuristicos(): Promise<PontoTuristico[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/pontos-turisticos`);
    if (!response.ok) {
      // Log the response text for more detailed error information
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PontoTuristico[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch pontos turísticos:", error);
    return []; // Return empty array on error to prevent app crash
  }
}

/**
 * Fetches a single PontoTuristico by its ID.
 * @param id The ID of the PontoTuristico to fetch.
 * @returns A PontoTuristico object or null if not found or an error occurs.
 */
export async function getPontoTuristicoById(id: number): Promise<PontoTuristico | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/ponto-turistico/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Ponto Turistico with ID ${id} not found.`);
        return null; // Explicitly return null for 404
      }
      const errorText = await response.text();
      console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PontoTuristico = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch ponto turístico with ID ${id}:`, error);
    return null; // Return null on any other error
  }
}

import { test, expect, request } from '@playwright/test';
import { PetStore } from '../../API/petStoreAPI';
import { ApiData } from '../../globals/globals';

test.describe('Test Post request for pet creation', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      extraHTTPHeaders: {
        Authorization: ApiData.bearer,
        'Content-Type': 'application/json',
      },
    });
  });

  test('Create the Pet and check ID', async () => {
    const petStore = new PetStore();
    const { petBody, jsonBody } = petStore.createPet();

    const response = await apiContext.post('https://petstore.swagger.io/v2/pet', {
      data: jsonBody,
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    console.log('✅ Pet created:', data);

    expect(data.name).toBe(petBody.name);
    expect(data.category.name).toBe(petBody.category.name);
  });
});

test.describe('PetStore API tests', () => {
  let apiContext;
  let createdPetId;
  let petBody;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      extraHTTPHeaders: {
        Authorization: ApiData.bearer,
        'Content-Type': 'application/json',
      },
    });
    const petStore = new PetStore();
    const result = petStore.createPet();
    petBody = result.petBody;
    const jsonBody = result.jsonBody;

    const response = await apiContext.post('https://petstore.swagger.io/v2/pet', {
      data: jsonBody,
    });

    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    console.log('✅ Pet created:', data);

    expect(data.name).toBe(petBody.name);
    expect(data.category.name).toBe(petBody.category.name);

    createdPetId = data.id;
  });

  test('Create the Pet and check ID', async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const checkResponse = await apiContext.get(
      `https://petstore.swagger.io/v2/pet/${createdPetId}`,
    );
    console.log('Check response status:', checkResponse.status());
    expect(checkResponse.ok()).toBeTruthy();

    const jsonResponseData = await checkResponse.json();

    expect(jsonResponseData.name).toBe(petBody.name);
    expect(jsonResponseData.category.name).toBe(petBody.category.name);
    const petData = await checkResponse.json();
    expect(petData.id).toBe(createdPetId);
  });

  test('Testing the Delete request by pet ID', async () => {
    expect(createdPetId).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve, 8000));
    const deleteResponse = await apiContext.delete(
      `https://petstore.swagger.io/v2/pet/${createdPetId}`,
    );
    expect(deleteResponse.ok()).toBeTruthy();
    await new Promise((resolve) => setTimeout(resolve, 8000));
    const checkAfterDelete = await apiContext.get(
      `https://petstore.swagger.io/v2/pet/${createdPetId}`,
    );
    expect(checkAfterDelete.status()).toBe(404);
  });
});

import { faker } from '@faker-js/faker';
import { error } from 'console';

class PetStore {
  createPet() {
    const pet_body = {
      id: faker.number.bigInt().toString(),
      category: {
        id: 0,
        name: faker.animal.cat(),
      },
      name: faker.animal.cat(),
      photoUrls: ['string'],
      tags: [
        {
          id: 0,
          name: 'string',
        },
      ],
      status: 'available',
    };

    const jsonBody = JSON.stringify(pet_body, null, 2);
    return { petBody: pet_body, jsonBody };
  }
}

async function CreatePetRequest() {
  const petStore = new PetStore();
  const { petBody, jsonBody } = petStore.createPet();

  const response = await fetch('https://petstore.swagger.io/v2/pet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonBody,
  });

  const data = await response.json();
  console.log('✅ Pet created:', data);
  if (data.name !== petBody.name) {
    throw new error('data.name === petBody.name');
  }
  if (data.category.name !== petBody.category.name) {
    throw new error('data.category.name === petBody.category.name');
  }
  return data.id;
}

export { PetStore };

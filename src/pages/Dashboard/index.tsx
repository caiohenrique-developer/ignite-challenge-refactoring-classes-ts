import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

export interface FoodsFormat {
  available: boolean;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
}

function Dashboard () {
  const [foods, setFoods] = useState<FoodsFormat[]>([]);
  const [editingFood, setEditingFood] = useState<FoodsFormat>({} as FoodsFormat);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const { data: foods } = await api.get('/foods');

      setFoods(foods);
    }

    loadProducts();
  }, []);

  async function handleAddFood(food: FoodsFormat) {
    try {
      const { data: addNewFood } = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, addNewFood]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodsFormat) {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() { setModalOpen(!modalOpen); }

  function toggleEditModal() { setEditModalOpen(!editModalOpen); }

  function handleEditFood(food: FoodsFormat) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;

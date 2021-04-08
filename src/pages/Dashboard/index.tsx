import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface DashProps {
  foodsList: [],
  editingFood: {},
  modalOpen: boolean,
  editModalOpen: boolean,
}

type FoodsFormat = Pick<DashProps, 'foodsList'>;

function Dashboard ({ editModalOpen, editingFood, foodsList, modalOpen }: DashProps) {
  const [foods, setFoods] = useState<FoodsFormat[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/foods');

      setFoods(data);
    }

    loadProducts();
  }, []);

  async function handleAddFood(food: FoodsFormat) {
    try {
      const { data } = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foodsList, data]);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(foods);

  // handleUpdateFood = async food => {
  //   const { foods, editingFood } = this.state;

  //   try {
  //     const foodUpdated = await api.put(
  //       `/foods/${editingFood.id}`,
  //       { ...editingFood, ...food },
  //     );

  //     const foodsUpdated = foods.map(f =>
  //       f.id !== foodUpdated.data.id ? f : foodUpdated.data,
  //     );

  //     this.setState({ foods: foodsUpdated });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // handleDeleteFood = async id => {
  //   const { foods } = this.state;

  //   await api.delete(`/foods/${id}`);

  //   const foodsFiltered = foods.filter(food => food.id !== id);

  //   this.setState({ foods: foodsFiltered });
  // }

  // toggleModal = () => {
  //   const { modalOpen } = this.state;

  //   this.setState({ modalOpen: !modalOpen });
  // }

  // toggleEditModal = () => {
  //   const { editModalOpen } = this.state;

  //   this.setState({ editModalOpen: !editModalOpen });
  // }

  // handleEditFood = food => {
  //   this.setState({ editingFood: food, editModalOpen: true });
  // }

  // render() {
    // const { modalOpen, editModalOpen, editingFood, foods } = this.state;

    return (
      <>
        <h1>blz</h1>
      </>
    );
  // }
};

export default Dashboard;

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LoadingSVG from '../assets/oval.svg';
import Modal from '../components/modal';
import Table from '../components/table';
import Title from '../components/title';
import { doGet } from '../utils/service';

const headers = ['name', 'climate', 'diameter', 'orbital_period', 'rotation_period', 'surface_water', 'more_info'];
const otherHeaders = ['created', 'edited', 'url', 'gravity', 'terrain', 'population'];

const Main = () => {
  const containerClasses = "container relative mx-auto flex justify-center items-center min-h-screen";
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState({});
  const [selectedItem, setSelectedItem] = useState([]);
  
  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);

      const { data } = await doGet();

      setData(data);

      setLoading(false);
    };

    apiCall();
  }, []);

  const renderPortal = () => {
    return createPortal(
      <Modal 
        setOpenModal={setOpenModal}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        open={openModal}
        keys={[...headers, ...otherHeaders]}
      />, 
      document.body
    );
  };

  const renderContent = () => {
    return (
      <div className="flex content-between flex-col">
        <Title>Qu Beyond Challenge</Title>
        <Table 
          headers={headers}
          rows={data.results}
          page={data.page} 
          count={data.count}
          nextPage={data.next}
          prevPage={data.prevPage}
          setSelectedItem={setSelectedItem}
          setOpenModal={setOpenModal} 
        />
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      {loading && <img src={LoadingSVG} alt="loading" />}
      {!loading && renderContent()} 
      {openModal && renderPortal()}
      <div id="modal"></div>
    </div>
  );
};

export default Main;

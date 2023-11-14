import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import LoadingSVG from '../assets/oval.svg';
import { Modal, Table, Title } from '../components';
import { doGet } from '../utils/service';

const headers = ['name', 'climate', 'diameter', 'orbital_period', 'rotation_period', 'surface_water', 'more_info'];
const otherHeaders = ['created', 'edited', 'url', 'gravity', 'terrain', 'population'];

export interface IPlanet {
  name: string;
  climate: string;
  diameter: string;
  orbital_period: string;
  rotation_period: string;
  surface_water: string;
  created?: string;
  edited?: string;
  url?: string;
  gravity?: string;
  terrain?: string;
  population?: string;
  more_info?: string;
}

interface IData {
  count: string;
  next: string;
  previous: string;
  results: IPlanet[];
}

interface IMainProps {
  className?: string;
}

const Main: React.FC<IMainProps> = () => {
  const containerClasses = "container relative mx-auto flex justify-center items-center min-h-screen";
  const defaultData = {
    count: null,
    next: null,
    previous: null,
    results: [],
  };

  const [loading, setLoading] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [actualPage, setActualPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<IData>(defaultData);
  const [selectedItem, setSelectedItem] = useState<IPlanet>(null);
  
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

  const handleNextPageClick = () => {
    if (data.next) {
      setIsLoadingContent(true);

      doGet(data.next).then((response) => {
        setData(response.data);
        setActualPage(actualPage + 1);
        setIsLoadingContent(false);
      });
    }
  }

  const handlePrevPageClick = () => {
    if (data.previous) {
      setIsLoadingContent(true);

      doGet(data.previous).then((response) => {
        setData(response.data);
        setActualPage(actualPage - 1);
        setIsLoadingContent(false);
      });
    }
  }

  const renderContent = () => {
    return (
      <div className="flex content-between flex-col">
        <Title>Qu Beyond Challenge</Title>
        <Table 
          count={Number(data.count)}
          results={data.results}
          headers={headers}
          isLoading={isLoadingContent}
          nextPage={handleNextPageClick}
          page={actualPage}
          prevPage={handlePrevPageClick}
          setOpenModal={setOpenModal} 
          setSelectedItem={setSelectedItem}
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

import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Container, Button, Table, Modal, Card, Badge } from '@themesberg/react-bootstrap';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { Routes } from '../../routes';
import LoadingOverlay from '../../components/LoadingOverlay';
import { getAxiosInstance, handleAxiosError } from '../../utils/betterAxiosHelpers';
import toast from 'react-hot-toast';
import SimplePagination from '../../components/SimplePagination';
import { genericErrorMessages } from '../../utils/errorMessages';
import { APPKEY } from '../constante/Const';
import { faBan, faCheck, faClock, faDownload, faEye, faHourglassEnd, faRunning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate, toDatetimeLocalValue } from '../../utils/dateUtils';
import { todayStart, todayEnd } from '../../utils/dateUtils';
import ReactMarkdown from 'react-markdown';
import { saveAs } from 'file-saver';
import { JOB_API_BASE_ROUTE, JOB_DOWNLOAD_BASE_ROUTE } from './apiRoutes';


const JobList = () => {
  const [cookies] = useCookies(['token']);
  const [shouldLogin, setShouldLogin] = useState(false);

  const [isBusy, setIsBusy] = useState(false);

  const [jobTypes, setJobTypes] = useState([]);

  const start = todayStart();
  const end = todayEnd();

  const [startDate, setStartDate] = useState(toDatetimeLocalValue(start));
  const [endDate, setEndDate] = useState(toDatetimeLocalValue(end));
  const [jobType, setJobType] = useState('');

  const [jobs, setJobs] = useState([]);

  const [pagination, setPagination] = useState({ currentPage: 1, lastPage: 1 });

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedJobDescription, setSelectedJobDescription] = useState('');

  const showJobDescription = (job) => {
    setSelectedJobDescription(job.description);
    setShowDescriptionModal(true);
  };
  const hideJobDescription = () => {
    setShowDescriptionModal(false);
    setSelectedJobDescription('');
  };

  const getDownloadUrl = (job) => `${JOB_DOWNLOAD_BASE_ROUTE}/${job.id}`;

  const extractFilename = (contentDisposition) => {
    let filename = '';
    const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch != null && filenameMatch[1]) {
      filename = filenameMatch[1].replace(/['"]/g, '');
    }
    return filename;
  };

  const downloadJobResult = async (job) => {
    setIsBusy(true);

    const url = getDownloadUrl(job);
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
        headers: {
          AppKey: APPKEY,
          AuthenticationToken: cookies.token
        }
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const contentDisposition = response.headers['content-disposition'];
      const filename = contentDisposition ? extractFilename(contentDisposition) : '';

      saveAs(blob, filename);
    } catch (error) {
      toast.error('Impossible de télécharger le fichier.')
      console.error(error);
    }

    setIsBusy(false);
  };

  const onStartDateChange = (ev) => setStartDate(ev.target.value);
  const onEndDateChange = (ev) => setEndDate(ev.target.value);
  const onJobTypeChange = (ev) => setJobType(ev.target.value);

  const axios = getAxiosInstance();

  const fetchJobTypes = async () => {
    const { data } = await axios.get('/job-types', {
      headers: {
        AppKey: APPKEY,
        AuthenticationToken: cookies.token
      }
    });
    return data;
  };

  const fetchJobs = async (page = pagination.currentPage) => {
    const { data } = await axios.get(JOB_API_BASE_ROUTE, {
      params: {
        startDate: `${startDate}:00.000Z`,
        endDate: `${endDate}:59.999Z`,
        jobType,
        page
      },
      headers: {
        AppKey: APPKEY,
        AuthenticationToken: cookies.token
      }
    });
    return data;
  };

  const updateJobsAndPages = (jobs, { total, perPage, currentPage }) => {
    const lastPage = Math.max(1, Math.ceil(total / perPage));
    setJobs(jobs);
    setPagination({ currentPage, lastPage });
  };

  const axiosErrorHandlers = {
    onForbidden: () => setShouldLogin(true),
    onResponseError: () => toast.error(genericErrorMessages.serverError),
    onRequestError: () => toast.error(genericErrorMessages.requestError),
    onError: () => toast.error(genericErrorMessages.networkError)
  };

  useEffect(() => {
    setIsBusy(true);
    fetchJobTypes()
      .then(jobTypes => setJobTypes(jobTypes))
      .catch((error) => handleAxiosError(error, axiosErrorHandlers))
      .finally(() => setIsBusy(false));
  }, []);

  const onFormSubmit = async (ev) => {
    ev.preventDefault();
    // We need to reset the displayed data, because if the request to fetch the jobs fails,
    // the data displayed in the table and pagination will be invalid.
    setJobs([]);
    setPagination({ currentPage: 1, lastPage: 1 });

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      toast.error('La date de début doit être antérieure\nà la date de fin.');
      return;
    }

    setIsBusy(true);
    try {
      const { data, meta } = await fetchJobs();
      updateJobsAndPages(data, meta);
    } catch (error) {
      handleAxiosError(error, axiosErrorHandlers);
    }
    setIsBusy(false);
  };

  const onPageChange = async (p) => {
    setIsBusy(true);
    try {
      const { data, meta } = await fetchJobs(p);
      updateJobsAndPages(data, meta);
    } catch (error) {
      handleAxiosError(error, axiosErrorHandlers);
    }
    setIsBusy(false);
  };

  if (!cookies.token) {
    return (
      <Redirect to={Routes.Signin.path} />
    );
  }

  if (shouldLogin) {
    return (
      <Redirect to={Routes.Signin.path} />
    );
  }

  return (
    <Container style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
      <LoadingOverlay isActive={isBusy} />
      <>
        <Form onSubmit={onFormSubmit}>
          <Row>
            <Col>
              <Form.Label>Date début</Form.Label>
              <Form.Control
                defaultValue={toDatetimeLocalValue(start)}
                type='datetime-local'
                onChange={onStartDateChange}
                required
              />
            </Col>

            <Col>
              <Form.Label>Date fin</Form.Label>
              <Form.Control
                defaultValue={toDatetimeLocalValue(end)}
                type='datetime-local'
                onChange={onEndDateChange}
                required
              />
            </Col>

            <Col>
              <Form.Label>Type</Form.Label>
              <Form.Select onChange={onJobTypeChange}>
                <option value=''>Tous</option>
                <For each='jobType' of={jobTypes}>
                  <option key={jobType} value={jobType}>{jobType}</option>
                </For>
              </Form.Select>
            </Col>
          </Row>

          <Row>
            <Col className="py-3">
              <Button type='submit' className='py-1'>Filtrer</Button>
            </Col>
          </Row>
        </Form>

        <Card border="light" className="table-wrapper table-responsive shadow-sm mb-4">
          <Card.Body className="pt-0 px-3">
            <Table hover>
              <thead>
                <tr>
                  <th className='w-25 px-2'>Titre</th>
                  <th className='px-2'>Type</th>
                  <th className='px-2'>Statut</th>
                  <th className='px-2'>Date de création</th>
                  <th className='px-2'>Date de fin</th>
                  <th className='px-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                <For each="job" of={jobs}>
                  <tr key={job.id}>
                    <td className='align-middle px-2'>{job.title}</td>
                    <td className='align-middle px-2'>{job.type}</td>
                    <td className='align-middle px-2'>
                      <JobStatusPill status={job.status} />
                    </td>
                    <td className='align-middle px-2'>{formatDate(job.createdAt)}</td>
                    <td className='align-middle px-2'>{job.endedAt ? formatDate(job.endedAt) : '-'}</td>
                    <td className='align-middle px-2'>
                      <button
                        className='btn btn-info btn-sm'
                        title='Afficher la description'
                        onClick={() => showJobDescription(job)}
                      >
                        <FontAwesomeIcon icon={faEye} size='sm' />
                      </button>
                      &nbsp;
                      <If condition={job.status === 'completed'}>
                        <button
                          className='btn btn-success btn-sm'
                          title='Télécharger le résultat'
                          onClick={() => downloadJobResult(job)}
                        >
                          <FontAwesomeIcon icon={faDownload} size='sm' />
                        </button>
                      </If>
                    </td>
                  </tr>
                </For>
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <SimplePagination
          currentPage={pagination.currentPage}
          lastPage={pagination.lastPage}
          onPageChange={onPageChange}
        />

        <Modal show={showDescriptionModal} onHide={hideJobDescription}>
          <Modal.Header className='p-3' closeButton>
            <Modal.Title>Description du job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactMarkdown>{selectedJobDescription}</ReactMarkdown>
          </Modal.Body>
        </Modal>
      </>
    </Container>
  );
};

function JobStatusPill({ status }) {
  const bgMap = {
    running: 'info',
    completed: 'success',
    failed: 'danger',
    waiting: 'dark',
    stalled: 'warning'
  }
  const bg = bgMap[status];

  const iconMap = {
    running: faRunning,
    completed: faCheck,
    failed: faBan,
    waiting: faClock,
    stalled: faHourglassEnd
  };
  const icon = iconMap[status];

  const translations = {
    running: 'En cours',
    completed: 'Terminé',
    failed: 'Échec',
    waiting: 'En attente',
    stalled: 'Suspendu'
  };
  const text = translations[status];

  const style = {
    fontSize: '0.75rem'
  }

  return (
    <Badge pill bg={bg} style={style} className='px-2 py-1'>
      <FontAwesomeIcon icon={icon} size='sm' />
      &nbsp;
      <span>{text}</span>
    </Badge>
  );
}

export default JobList;

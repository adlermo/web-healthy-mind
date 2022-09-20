import React, { useEffect, useState } from 'react';

import { usePatientsList } from 'src/services/Patient/hooks';
import { IPatientParser } from 'src/services/Patient/dtos/IPatientParser';

const ViewPatient: React.FC<any> = (patientId: string) => {
  const [patient, setPatient] = useState<IPatientParser[]>([]);
  const { data: getPatient, isLoading } = usePatientsList({ page: 1 });

  useEffect(() => {
    console.log('patientId');
    console.log(patientId);
    return getPatient && setPatient(getPatient.filter((p) => p.id === patientId));
  }, [getPatient, patientId]);

  return (
    <>
      <p>{patient.length}</p>
      {/* <p>{patient[0].email}</p> */}
      {/* <p>{patient[0].document}</p> */}
    </>
  );
};

export default ViewPatient;

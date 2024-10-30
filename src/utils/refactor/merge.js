import { dateTimeToInput } from "../Functions";

export const mergeUser = (user) => {
  if (user.role) {
    user = {
      ...user,
      role: { label: user?.role, value: user?.role },
    };
  }

  return user;
};

export const mergeAssign = (assign) => {
  if (assign.professor_id) {
    assign = {
      ...assign,
      professor_id: {
        label: `${assign?.professor?.ref} ${assign?.professor?.first_name}`,
        value: assign?.professor_id,
      },
    };
  }

  if (assign.training_id) {
    assign = {
      ...assign,
      training_id: {
        label: assign?.training?.training_name,
        value: assign?.training_id,
      },
    };
  }

  if (assign.assignment_date) {
    assign = {
      ...assign,
      assignment_date: dateTimeToInput(assign?.assignment_date),
    };
  }

  return assign;
};

export const mergeParticipation = (participation) => {
  if (participation.student_id) {
    participation = {
      ...participation,
      student_id: {
        label: `${participation?.student?.registration} ${participation?.student?.first_name}`,
        value: participation?.student_id,
      },
    };
  }

  if (participation.training_id) {
    participation = {
      ...participation,
      training_id: {
        label: participation?.training?.training_name,
        value: participation?.training_id,
      },
    };
  }

  if (participation.participation_date) {
    participation = {
      ...participation,
      participation_date: dateTimeToInput(participation?.participation_date),
    };
  }

  return participation;
};

export const mergeSale = (sale) => {
  if (sale.equipment_id) {
    sale = {
      ...sale,
      equipment_id: {
        label: `${sale?.equipment?.ref} ${sale?.equipment?.design}`,
        value: sale?.equipment_id,
      },
    };
  }

  if (sale.client_id) {
    sale = {
      ...sale,
      client_id: {
        label: `${sale?.client?.ref} ${sale?.client?.first_name}`,
        value: sale?.client_id,
      },
    };
  }

  if (sale.sale_date) {
    sale = {
      ...sale,
      sale_date: dateTimeToInput(sale?.sale_date),
    };
  }

  return sale;
};

export const professorToSelect = (array = []) => {
  return array?.map((val) => {
    return {
      label: `${val?.ref} ${val?.first_name}`,
      value: val.id,
    };
  });
};

export const studentToSelect = (array = []) => {
  return array?.map((val) => {
    return {
      label: `${val?.registration} ${val?.first_name}`,
      value: val.id,
    };
  });
};
export const trainingToSelect = (array = []) => {
  return array?.map((val) => {
    return {
      label: `${val?.training_name}`,
      value: val.id,
    };
  });
};

export const equipmentToSelect = (array = []) => {
  return array?.map((val) => {
    return {
      label: `${val?.ref} ${val?.design}`,
      value: val.id,
    };
  });
};

export const clientToSelect = (array = []) => {
  return array?.map((val) => {
    return {
      label: `${val?.ref} ${val?.first_name}`,
      value: val.id,
    };
  });
};

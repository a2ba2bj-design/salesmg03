SELECT
  tblcriteria.id,
  tblcriteria.criteriaName,
  tblcriteria.factor,
  tblcat.catName,
  tblcat.id AS catid,
  1 AS criteriaExist,
  tblevaluation_baseform_detail.evaluation_baseformID AS evaluation_baseformID
FROM
  tblcriteria
  JOIN tblevaluation_baseform
  JOIN tblevaluation_baseform_detail ON tblevaluation_baseform.id = tblevaluation_baseform_detail.evaluation_baseformID;
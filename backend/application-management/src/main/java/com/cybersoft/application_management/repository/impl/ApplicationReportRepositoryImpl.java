package com.cybersoft.application_management.repository.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.cybersoft.application_management.dto.request.ApplicationReportRequest;
import com.cybersoft.application_management.dto.response.ApplicationFormTypeReport;
import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.entity.FormType;
import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.repository.ApplicationReportRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApplicationReportRepositoryImpl implements ApplicationReportRepository {

    private final EntityManager entityManager;

    private List<Predicate> buildPredicates(
            ApplicationReportRequest request,
            Root<ApplicationForm> root,
            CriteriaBuilder cb) {

        List<Predicate> predicates = new ArrayList<>();
        if (request.getStartDate() != null) {
            predicates.add(
                    cb.greaterThanOrEqualTo(
                            root.get("createdAt"),
                            request.getStartDate()));
        }
        if (request.getEndDate() != null) {
            predicates.add(
                    cb.lessThanOrEqualTo(
                            root.get("createdAt"),
                            request.getEndDate()));
        }
        if (request.getStatus() != null) {
            predicates.add(
                    cb.equal(
                            root.get("status"),
                            request.getStatus()));
        }
        if (request.getFormTypeId() != null) {
            predicates.add(
                    cb.equal(
                            root.get("formType").get("id"),
                            request.getFormTypeId()));
        }
        return predicates;
    }

    @Override
    public long countApplications(
            ApplicationReportRequest request) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<ApplicationForm> root = query.from(ApplicationForm.class);
        query.select(cb.count(root));
        List<Predicate> predicates = buildPredicates(
                request,
                root,
                cb);
        query.where(
                predicates.toArray(new Predicate[0]));
        return entityManager
                .createQuery(query)
                .getSingleResult();
    }

    @Override
    public long countApplicationsByStatus(
            ApplicationStatus status,
            ApplicationReportRequest request) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<ApplicationForm> root = query.from(ApplicationForm.class);
        query.select(cb.count(root));
        List<Predicate> predicates = buildPredicates(request, root, cb);
        predicates.add(
                cb.equal(
                        root.get("status"),
                        status));
        query.where(
                predicates.toArray(new Predicate[0]));
        return entityManager
                .createQuery(query)
                .getSingleResult();
    }

    @Override
    public List<ApplicationFormTypeReport> countApplicationsByFormType(
            ApplicationReportRequest request) {

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();

        CriteriaQuery<ApplicationFormTypeReport> query = cb.createQuery(
                ApplicationFormTypeReport.class);

        Root<ApplicationForm> root = query.from(ApplicationForm.class);

        Join<ApplicationForm, FormType> formType = root.join("formType");

        List<Predicate> predicates = buildPredicates(request, root, cb);

        query.select(
                cb.construct(
                        ApplicationFormTypeReport.class,
                        formType.get("id"),
                        formType.get("name"),
                        cb.count(root)));

        query.where(
                predicates.toArray(new Predicate[0]));

        query.groupBy(
                formType.get("id"),
                formType.get("name"));

        query.orderBy(
                cb.desc(cb.count(root)));

        return entityManager
                .createQuery(query)
                .getResultList();
    }

}

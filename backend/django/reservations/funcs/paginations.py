from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response


class CustomPagination(PageNumberPagination):
  def get_paginated_response(self, data):
    return Response({
        'next': self.get_next_link(),
        'previous': self.get_previous_link(),
        'count': self.page.paginator.count,
        'total_pages': self.page.paginator.num_pages,
        'current_page': self.page.number,
        'results': data,
        'page_size': self.page_size,
        'range_first': (self.page.number * self.page_size) - (self.page_size) + 1,
        'range_last': min((self.page.number * self.page_size), self.page.paginator.count),
    })


class ApprovalApplicationPagination(LimitOffsetPagination):
  default_limit = 20
  max_limit = 100

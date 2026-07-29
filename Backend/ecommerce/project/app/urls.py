from app import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes, name='getRoutes'),

    path('products/', views.getProducts, name='getproducts'),
    path('product/<str:pk>/', views.getProduct, name='getProduct'),
    # Product Delete
    path('product/delete/<str:pk>/', views.deleteProduct, name='delete-product'),

    path('user/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/register/', views.registerUser, name='register'),

    # Latest Users
    path('users/', views.getUsers, name='users'),

    # Orders
    path('orders/add/', views.addOrder, name='add-order'),
    path('orders/myorders/', views.getMyOrders, name='my-orders'),

    # Wishlist
    path('wishlist/', views.getWishlist, name='wishlist'),
    path('wishlist/add/', views.addWishlist, name='wishlist-add'),
    path('wishlist/remove/<str:pk>/', views.removeWishlist, name='wishlist-remove'),

    # JWT Refresh
    path('user/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
